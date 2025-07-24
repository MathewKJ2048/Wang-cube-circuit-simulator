
export const canvas : HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
export const ctx : CanvasRenderingContext2D = canvas.getContext('2d')!;

export const downloadButton : HTMLButtonElement = document.getElementById('download-button') as HTMLButtonElement
export const uploadButton : HTMLButtonElement = document.getElementById('upload-button') as HTMLButtonElement

export const zoomInButton : HTMLButtonElement = document.getElementById('zoom-in-button') as HTMLButtonElement;
export const zoomOutButton : HTMLButtonElement = document.getElementById('zoom-out-button') as HTMLButtonElement;


export const cutButton : HTMLButtonElement = document.getElementById('-button') as HTMLButtonElement;
export const copyButton : HTMLButtonElement = document.getElementById('-button') as HTMLButtonElement;
export const pasteButton : HTMLButtonElement = document.getElementById('-button') as HTMLButtonElement;
export const saveButton : HTMLButtonElement = document.getElementById('-button') as HTMLButtonElement;

export const defaultButton : HTMLButtonElement = document.getElementById('default-button') as HTMLButtonElement;
export const selectButton : HTMLButtonElement = document.getElementById('select-button') as HTMLButtonElement;
export const eraseButton : HTMLButtonElement = document.getElementById('erase-button') as HTMLButtonElement;