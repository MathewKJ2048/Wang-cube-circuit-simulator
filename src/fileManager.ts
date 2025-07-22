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
	} catch (err) {
	  if (err instanceof Error && err.name !== 'AbortError') {
		console.error('Failed to save JSON file:', err.message);
		throw err; // Re-throw for caller to handle
	  }
	  // User canceled the save dialog - silent return
	}
  }


export function setupLoadSaveButtons(): void {
	const saveButton : HTMLButtonElement = document.getElementById('save-button') as HTMLButtonElement
	saveButton.addEventListener('click', async() => 
	{
		WangFileToJSON(new WangFile())
		console.log("file saving called")
	})
}