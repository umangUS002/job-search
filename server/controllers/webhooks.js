import { Webhook } from "svix";
import mongoose from "mongoose";
import User from "../models/User.js";
import connectDB from "../configs/db.js";

const clerkWebhooks = async (req, res) => {
  try {
    console.log("👉 Incoming webhook");

    await connectDB();
    console.log("✅ DB Connected");

    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const evt = whook.verify(
      JSON.stringify(req.body),
      {
        "svix-id": req.headers["svix-id"],
        "svix-timestamp": req.headers["svix-timestamp"],
        "svix-signature": req.headers["svix-signature"]
      }
    );

    console.log("✅ Webhook Verified");

    const { data, type } = evt;

    console.log("📦 Event Type:", type);
    console.log("📦 Event Data:", data);

    switch (type) {
      case 'user.created': {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0]?.email_address || '',
          name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
          image: data.image_url || '',
          resume: ''
        };
        await User.create(userData);
        console.log("✅ User Created in DB:", userData);
        res.json({ success: true });
        break;
      }

      case 'user.updated': {
        const userData = {
          email: data.email_addresses[0]?.email_address || '',
          name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
          image: data.image_url || '',
        };
        await User.findByIdAndUpdate(data.id, userData);
        console.log("✅ User Updated:", data.id);
        res.json({ success: true });
        break;
      }

      case 'user.deleted': {
        await User.findByIdAndDelete(data.id);
        console.log("✅ User Deleted:", data.id);
        res.json({ success: true });
        break;
      }

      default:
        console.log("⚠️ Unhandled Webhook Type:", type);
        res.json({});
    }

  } catch (error) {
    console.error("❌ Webhook Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export default clerkWebhooks;