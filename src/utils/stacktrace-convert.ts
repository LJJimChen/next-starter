import { parse as stacktraceParse, StackFrame } from 'stacktrace-parser';
import { SourceMapConsumer } from 'source-map';
import { readFile } from 'fs/promises';
export async function stacktrackConvert(
    stack: string,
    stackPrefix: RegExp | string,
    sourcemapFolder: string
): Promise<string> {
    const stackframes = stacktraceParse(stack);
    const newFrames: StackFrame[] = [];
    const consumerMap = new Map<string, SourceMapConsumer>();
    for (const stackValue of stackframes) {
        const srcFileName = stackValue.file!.replace(
            stackPrefix,
            sourcemapFolder
        );
        if (!srcFileName.includes(sourcemapFolder)) {
            newFrames.push({ ...stackValue });
            continue;
        }
        let consumer = consumerMap.get(srcFileName);
        if (!consumer) {
            let srcMapContent = await readFile(srcFileName + '.map', 'utf-8');
            consumer = await new SourceMapConsumer(srcMapContent);
            consumerMap.set(srcFileName, consumer);
        }
        const originalStack = consumer.originalPositionFor({
            line: stackValue.lineNumber!,
            column: stackValue.column! - 1,
        });
        newFrames.push({
            file:
                originalStack.source?.replace('webpack:///', './') ||
                '<anonymous>',
            methodName: originalStack.name || '<unknown>',
            lineNumber: originalStack.line! - 1,
            column: originalStack.column! + 1,
            arguments: [],
        });
    }
    consumerMap.forEach((c) => c.destroy());

    const orginalStack = newFrames
        .map((frame) => {
            const line = frame.lineNumber ? `:${frame.lineNumber}` : '';
            const col = frame.column ? `:${frame.column}` : '';
            const stack = `at ${frame.methodName} (${frame.file}${line}${col})`;
            return stack;
        })
        .join('\n');
    return orginalStack;
}

(async () => {
    const stack = `TypeError: Cannot read properties of null (reading 'toString')
    at onClick (http://localhost:3000/_next/static/chunks/pages/index-2117f7fa283a1165.js:1:579)
    at Object.b1 (http://localhost:3000/_next/static/chunks/framework-e2b5cf9ca2d2a331.js:11:16815)
    at b7 (http://localhost:3000/_next/static/chunks/framework-e2b5cf9ca2d2a331.js:11:16969)
    at http://localhost:3000/_next/static/chunks/framework-e2b5cf9ca2d2a331.js:11:35776
    at d1 (http://localhost:3000/_next/static/chunks/framework-e2b5cf9ca2d2a331.js:11:35876)
    at d2 (http://localhost:3000/_next/static/chunks/framework-e2b5cf9ca2d2a331.js:11:36290)
    at http://localhost:3000/_next/static/chunks/framework-e2b5cf9ca2d2a331.js:11:41750
    at D (http://localhost:3000/_next/static/chunks/framework-e2b5cf9ca2d2a331.js:11:105123)
    at b$ (http://localhost:3000/_next/static/chunks/framework-e2b5cf9ca2d2a331.js:11:15953)
    at d8 (http://localhost:3000/_next/static/chunks/framework-e2b5cf9ca2d2a331.js:11:37582)`;

    // const stack = `"TypeError: Failed to fetch
    // at http://localhost:3000/_next/static/chunks/pages/index-2117f7fa283a1165.js:1:791
    // at u (http://localhost:3000/_next/static/chunks/main-cd5f6468f0ce43fc.js:1:96839)
    // at Generator._invoke (http://localhost:3000/_next/static/chunks/main-cd5f6468f0ce43fc.js:1:98125)
    // at a.<computed> [as next] (http://localhost:3000/_next/static/chunks/main-cd5f6468f0ce43fc.js:1:97242)
    // at e (http://localhost:3000/_next/static/chunks/pages/index-2117f7fa283a1165.js:1:237)
    // at d (http://localhost:3000/_next/static/chunks/pages/index-2117f7fa283a1165.js:1:965)
    // at http://localhost:3000/_next/static/chunks/pages/index-2117f7fa283a1165.js:1:1024
    // at new Promise (<anonymous>)
    // at http://localhost:3000/_next/static/chunks/pages/index-2117f7fa283a1165.js:1:906"`;
    const folder =
        '/Users/lj/Documents/code/Web/react/next-starter/.next/sourcemap';
    console.time('convert');
    const originstack = await stacktrackConvert(stack, /^.+_next/i, folder);
    console.timeEnd('convert');
    console.log(originstack);
})();
