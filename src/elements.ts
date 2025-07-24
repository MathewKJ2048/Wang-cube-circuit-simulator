
export const canvas : HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
export const ctx : CanvasRenderingContext2D = canvas.getContext('2d')!;

export const downloadButton : HTMLButtonElement = document.getElementById('download-button') as HTMLButtonElement
export const uploadButton : HTMLButtonElement = document.getElementById('upload-button') as HTMLButtonElement

export const zoomInButton : HTMLButtonElement = document.getElementById('zoom-in-button') as HTMLButtonElement;
export const zoomOutButton : HTMLButtonElement = document.getElementById('zoom-out-button') as HTMLButtonElement;
export const resetViewButton : HTMLButtonElement = document.getElementById('reset-view-button') as HTMLButtonElement;
export const zoomSlider = document.getElementById('zoom-slider') as HTMLInputElement;


export const cutButton : HTMLButtonElement = document.getElementById('cut-button') as HTMLButtonElement;
export const deleteButton : HTMLButtonElement = document.getElementById('delete-button') as HTMLButtonElement;
export const copyButton : HTMLButtonElement = document.getElementById('copy-button') as HTMLButtonElement;
export const pasteButton : HTMLButtonElement = document.getElementById('paste-button') as HTMLButtonElement;
export const saveButton : HTMLButtonElement = document.getElementById('save-button') as HTMLButtonElement;

export const defaultButton : HTMLButtonElement = document.getElementById('default-button') as HTMLButtonElement;
export const selectButton : HTMLButtonElement = document.getElementById('select-button') as HTMLButtonElement;
export const eraseButton : HTMLButtonElement = document.getElementById('erase-button') as HTMLButtonElement;