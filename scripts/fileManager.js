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
            // Convert to JSON with 2-space indentation
            const jsonString = JSON.stringify(data, null, 2);
            const blob = new Blob([jsonString], { type: 'application/json' });
            // Legacy download approach
            {
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
        }
        catch (err) {
            if (err instanceof Error && err.name !== 'AbortError') {
                console.error('Failed to save JSON file:', err.message);
                throw err; // Re-throw for caller to handle
            }
            // User canceled the save dialog - silent return
        }
    });
}
export function setupLoadSaveButtons() {
    const saveButton = document.getElementById('save-button');
    saveButton.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
        WangFileToJSON(new WangFile());
        console.log("file saving called");
    }));
}
