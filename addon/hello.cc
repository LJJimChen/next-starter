#include <napi.h>
#include <thread>

using namespace Napi;

Promise LongOperation(const CallbackInfo& info) {
  Napi::Env env = info.Env();

  // Create a Promise
  Napi::Promise::Deferred deferred = Napi::Promise::Deferred::New(env);
  Napi::Promise promise = deferred.Promise();

  // Create a ThreadSafeFunction using a lambda function.
  Napi::ThreadSafeFunction tsfn = Napi::ThreadSafeFunction::New(
      env,
      Napi::Function::New(env,
                          [&](const Napi::CallbackInfo& info) {
                            Object obj = Object::New(deferred.Env());
                            obj.Set("name", "lucy");
                            obj.Set("age", 20);
                            deferred.Resolve(obj);
                          }),
      "Callback",
      0,
      1,
      [&](Napi::Env env) {
        // This function will be called when the ThreadSafeFunction is no longer
        // in use. You can clean up any resources associated with the
        // ThreadSafeFunction here.

        Object obj = Object::New(deferred.Env());
        obj.Set("name", "lucy");
        obj.Set("age", 20);
        deferred.Resolve(obj);
      });

  std::thread nativeThread([&]() {
    // Resolve the promise in the main thread
    // deferred.Resolve(Number::From(deferred.Env(), 22));
    // Sleep for some time.
    printf("inside thread start");
    // Simulate some work
    std::this_thread::sleep_for(std::chrono::seconds(2));

    // Call the ThreadSafeFunction to resolve the promise
    // tsfn.([](Napi::Env env, Napi::Function jsCallback) {

    // });
    printf("inside thread end");
  });

  // Detach the thread so that it can run independently
  nativeThread.detach();

  // Return the Promise to JavaScript
  return promise;
}

Object Init(Env env, Object exports) {
  exports.Set("longOperation", Function::New(env, LongOperation));
  return exports;
}

NODE_API_MODULE(addon, Init)
