import { WebTracerProvider,BatchSpanProcessor, } from '@opentelemetry/sdk-trace-web';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { ServiceWorkerSpanExporter } from '../customSpanExporter/ServiceWorkerSpanExporter';
import { ConsoleSpanExporter, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { DocumentLoadInstrumentation } from '@opentelemetry/instrumentation-document-load';
import { ZoneContextManager } from '@opentelemetry/context-zone';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { XMLHttpRequestInstrumentation } from '@opentelemetry/instrumentation-xml-http-request';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions'

console.log('Hey, the content script is running!');
window.addEventListener("load", function(request){
   console.log('V53 I called open telemetry apis to capture page loading details. Next step is to forward this info to Jager');   
 
  // initOpenTelemetry();
  console.log("Posting the data");


  // This is one way of sending data where we are directly calling otel exporter
  /*
  const collectorOptions = {
    url: 'http://localhost:4318/v1/traces', // url is optional and can be omitted - default is http://localhost:4318/v1/traces
    headers: {}, // an optional object containing custom headers to be sent with each request
    concurrencyLimit: 10, // an optional limit on pending requests
  };

  const provider = new WebTracerProvider();
  const exporter = new OTLPTraceExporter(collectorOptions);
  provider.addSpanProcessor(new BatchSpanProcessor(exporter, {
    // The maximum queue size. After the size is reached spans are dropped.
    maxQueueSize: 100,
    // The maximum batch size of every export. It must be smaller or equal to maxQueueSize.
    maxExportBatchSize: 10,
    // The interval between two consecutive exports
    scheduledDelayMillis: 500,
    // How long the export can run before it is cancelled
    exportTimeoutMillis: 30000,
  }));

  provider.register();
  console.log("Posting completed");

  */

  // The second most elegant way is user custom span exporter and using backend script for sending traces

  const provider = new WebTracerProvider({
    resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: "ts-chrome-extension"
    }),
  });
  //const provider = new WebTracerProvider();
  provider.addSpanProcessor(new SimpleSpanProcessor(new ServiceWorkerSpanExporter()));

  provider.register({
    // Changing default contextManager to use ZoneContextManager - supports asynchronous operations - optional
    contextManager: new ZoneContextManager(),
  });

  // Registering instrumentations
  registerInstrumentations({
    instrumentations: [
      new DocumentLoadInstrumentation(),
      new XMLHttpRequestInstrumentation()
    ],
  });

});