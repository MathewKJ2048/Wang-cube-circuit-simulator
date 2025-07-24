import { downloadButton, uploadButton } from "./elements.js";
import { WangFile } from "./logic.js"

/**
 * Converts an object to a downloadable JSON file
 * @param data Arbitrary object to convert to JSON
 * @param filename Suggested filename (without extension)
 * @returns Promise that resolves when download completes
 */
export async function WangFileToJSON(
	data: WangFile,
	filename = 'wang-cube-simulation'
  ): Promise<void> {
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
	  
	} catch (err) {
	  if (err instanceof Error && err.name !== 'AbortError') {
		console.error('Failed to save JSON file:', err.message);
		throw err; 
	  }

	}
  }


/**
 * Opens a file picker for JSON files and returns parsed content
 * @param expectedType Optional type guard function to validate the JSON structure
 * @returns Promise resolving to the parsed JSON content
 */
export async function openJsonFile<T = unknown>(
	expectedType?: (data: unknown) => data is T
  ): Promise<T> 
{
	try 
	{
		const input = document.createElement('input');
		input.type = 'file';
		input.accept = '.json,application/json';
	  
		return new Promise((resolve, reject) => {
		  input.onchange = async () => {
			if (input.files?.[0]) {
			  try {
				const result = await parseJsonFile(input.files[0], expectedType);
				resolve(result);
			  } catch (err) {
				reject(err);
			  }
			} else {
			  reject(new Error('No file selected'));
			}
		  };
		  input.click();
		});
	  
	} catch (err) {
	  if (err instanceof Error && err.name !== 'AbortError') {
		console.error('File selection failed:', err);
		throw err;
	  }
	  throw new Error('File selection cancelled');
	}
}
  

// Helper function to parse and validate JSON file
// T is a template so the function returns a promise of type T
// the typeGuard is a custom function used to check type
async function parseJsonFile<T>(
file: File,
typeGuard?: (data: unknown) => data is T
): Promise<T> {
const content = await file.text();

try {
	const parsed = JSON.parse(content);
	
	if (typeGuard && !typeGuard(parsed)) {
	throw new Error('File content does not match expected type');
	}
	
	return parsed;
} catch (err) {
	throw new Error(`Invalid JSON: ${err instanceof Error ? err.message : String(err)}`);
}
}



export function setupUploadDownloadButtons(wf : WangFile): void 
{
	downloadButton.addEventListener('click', async() => 
	{
		WangFileToJSON(wf)
		console.log("file saving called")
	})
	
	uploadButton.addEventListener('click',async() => 
	{
		let data = await openJsonFile<WangFile>(WangFile.isWangFile);	
		wf.overWrite(data)
	})
}