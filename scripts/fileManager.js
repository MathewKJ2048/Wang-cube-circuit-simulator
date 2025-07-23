var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { WangFile } from "./logic.js";
/**
 * Converts an object to a downloadable JSON file
 * @param data Arbitrary object to convert to JSON
 * @param filename Suggested filename (without extension)
 * @returns Promise that resolves when download completes
 */
export function WangFileToJSON(data_1) {
    return __awaiter(this, arguments, void 0, function* (data, filename = 'wang-cube-simulation') {
        try {
            const jsonString = JSON.stringify(data, null, 4);
            const blob = new Blob([jsonString], { type: 'application/json' });
            // Legacy download approach
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${filename}.json`;
            document.body.appendChild(a);
            a.click();
            // Cleanup
            setTimeout(() => {
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }, 100);
        }
        catch (err) {
            if (err instanceof Error && err.name !== 'AbortError') {
                console.error('Failed to save JSON file:', err.message);
                throw err;
            }
        }
    });
}
/**
 * Opens a file picker for JSON files and returns parsed content
 * @param expectedType Optional type guard function to validate the JSON structure
 * @returns Promise resolving to the parsed JSON content
 */
export function openJsonFile(expectedType) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json,application/json';
            return new Promise((resolve, reject) => {
                input.onchange = () => __awaiter(this, void 0, void 0, function* () {
                    var _a;
                    if ((_a = input.files) === null || _a === void 0 ? void 0 : _a[0]) {
                        try {
                            const result = yield parseJsonFile(input.files[0], expectedType);
                            resolve(result);
                        }
                        catch (err) {
                            reject(err);
                        }
                    }
                    else {
                        reject(new Error('No file selected'));
                    }
                });
                input.click();
            });
        }
        catch (err) {
            if (err instanceof Error && err.name !== 'AbortError') {
                console.error('File selection failed:', err);
                throw err;
            }
            throw new Error('File selection cancelled');
        }
    });
}
// Helper function to parse and validate JSON file
// T is a template so the function returns a promise of type T
// the typeGuard is a custom function used to check type
function parseJsonFile(file, typeGuard) {
    return __awaiter(this, void 0, void 0, function* () {
        const content = yield file.text();
        try {
            const parsed = JSON.parse(content);
            if (typeGuard && !typeGuard(parsed)) {
                throw new Error('File content does not match expected type');
            }
            return parsed;
        }
        catch (err) {
            throw new Error(`Invalid JSON: ${err instanceof Error ? err.message : String(err)}`);
        }
    });
}
export function setupUploadDownloadButtons() {
    const saveButton = document.getElementById('download-button');
    saveButton.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
        WangFileToJSON(new WangFile());
        console.log("file saving called");
    }));
    const loadButton = document.getElementById('upload-button');
    loadButton.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
        let data = yield openJsonFile(WangFile.isWangFile);
        console.log(data);
    }));
}
