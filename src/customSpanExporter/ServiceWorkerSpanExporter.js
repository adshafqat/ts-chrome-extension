"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceWorkerSpanExporter = void 0;
const core_1 = require("@opentelemetry/core");
const otlp_transformer_1 = require("@opentelemetry/otlp-transformer");

/**
 * This is implementation of {@link SpanExporter} that prints spans to the
 * console. This class can be used for diagnostic purposes.
 */
/* eslint-disable no-console */

async function sendDataToServiceWorker(data){
    console.log("sending: ", data);

    chrome.runtime.sendMessage({
        data : data
    }, function (response){
        console.log("Response", response);
    })
}
class ServiceWorkerSpanExporter {
    /**
     * Export spans.
     * @param spans
     * @param resultCallback
     */
    export(spans, resultCallback) {
        return this._sendSpans(spans, resultCallback);
    }
    /**
     * Shutdown the exporter.
     */
    shutdown() {
        this._sendSpans([]);
        return Promise.resolve();
    }
    /**
     * converts span info into more readable format
     * @param span
     */
    _exportInfo(spans) {
        return (0, otlp_transformer_1.createExportTraceServiceRequest)(spans, true);
    }
    /**
     * Showing spans in console
     * @param spans
     * @param done
     */
    _sendSpans(spans, done) {
        console.log("Sending data to backgroud serviceworker");
        sendDataToServiceWorker(this._exportInfo(spans));
        console.log("data sent");
        
        if (done) {
            return done({ code: core_1.ExportResultCode.SUCCESS });
        }
    }
}
exports.ServiceWorkerSpanExporter = ServiceWorkerSpanExporter;
//# sourceMappingURL=ServiceWorkerSpanExporter.d.js.map