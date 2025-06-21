// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node"
import { nodeProfilingIntegration } from "@sentry/profiling-node"

Sentry.init({
  dsn: "https://26c03f474c9d50da5c419b429efd0579@o4509535003934720.ingest.us.sentry.io/4509535009308672",
  integrations: [
    nodeProfilingIntegration(),
    Sentry.mongooseIntegration()
  ],

  // Tracing
  // tracesSampleRate: 1.0,

  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
});

Sentry.profiler.startProfiler();

Sentry.startSpan({
    name: "My first transaction",
}, () =>{

});

Sentry.profiler.stopProfiler();