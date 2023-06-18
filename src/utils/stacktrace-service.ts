// import { stacktrackConvert } from "./stacktrace-convert";

class StacktraceService {
    convert(stack: string): string {
        return '';
    }
}

export const stacktraceService = new StacktraceService();
// (async () => {
//     const stack = `TypeError: Cannot read properties of null (reading 'toString')
//     at onClick (http://localhost:3000/_next/static/chunks/pages/index-2117f7fa283a1165.js:1:579)
//     at Object.b1 (http://localhost:3000/_next/static/chunks/framework-e2b5cf9ca2d2a331.js:11:16815)
//     at b7 (http://localhost:3000/_next/static/chunks/framework-e2b5cf9ca2d2a331.js:11:16969)
//     at http://localhost:3000/_next/static/chunks/framework-e2b5cf9ca2d2a331.js:11:35776
//     at d1 (http://localhost:3000/_next/static/chunks/framework-e2b5cf9ca2d2a331.js:11:35876)
//     at d2 (http://localhost:3000/_next/static/chunks/framework-e2b5cf9ca2d2a331.js:11:36290)
//     at http://localhost:3000/_next/static/chunks/framework-e2b5cf9ca2d2a331.js:11:41750
//     at D (http://localhost:3000/_next/static/chunks/framework-e2b5cf9ca2d2a331.js:11:105123)
//     at b$ (http://localhost:3000/_next/static/chunks/framework-e2b5cf9ca2d2a331.js:11:15953)
//     at d8 (http://localhost:3000/_next/static/chunks/framework-e2b5cf9ca2d2a331.js:11:37582)`;
//     const folder =
//         '/Users/lj/Documents/code/Web/react/next-starter/.next/sourcemap';
//     console.time('convert');
//     const originstack = await stacktrackConvert(stack, /^.+_next/i, folder);
//     console.timeEnd('convert');
//     console.log(originstack);
// })();
