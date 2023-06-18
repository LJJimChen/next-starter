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


