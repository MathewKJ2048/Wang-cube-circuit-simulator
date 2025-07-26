
export const canvas : HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
export const ctx : CanvasRenderingContext2D = canvas.getContext('2d')!;

export const previewCanvas : HTMLCanvasElement = document.getElementById('preview-canvas') as HTMLCanvasElement;
export const previewCtx : CanvasRenderingContext2D = previewCanvas.getContext('2d')!;

export const downloadButton : HTMLButtonElement = document.getElementById('download-button') as HTMLButtonElement
export const uploadButton : HTMLButtonElement = document.getElementById('upload-button') as HTMLButtonElement

export const zoomInButton : HTMLButtonElement = document.getElementById('zoom-in-button') as HTMLButtonElement;
export const zoomOutButton : HTMLButtonElement = document.getElementById('zoom-out-button') as HTMLButtonElement;
export const resetViewButton : HTMLButtonElement = document.getElementById('reset-view-button') as HTMLButtonElement;
export const zoomSlider = document.getElementById('zoom-slider') as HTMLInputElement;
export const toggleGridButton : HTMLButtonElement = document.getElementById('toggle-grid-button') as HTMLButtonElement;


export const pausePlayButton : HTMLButtonElement = document.getElementById('pause-play-button') as HTMLButtonElement;
export const speedUpButton : HTMLButtonElement = document.getElementById('speed-up-button') as HTMLButtonElement;
export const slowDownButton : HTMLButtonElement = document.getElementById('slow-down-button') as HTMLButtonElement;
export const speedSlider = document.getElementById('speed-slider') as HTMLInputElement;


export const cutButton : HTMLButtonElement = document.getElementById('cut-button') as HTMLButtonElement;
export const deleteButton : HTMLButtonElement = document.getElementById('delete-button') as HTMLButtonElement;
export const copyButton : HTMLButtonElement = document.getElementById('copy-button') as HTMLButtonElement;
export const pasteButton : HTMLButtonElement = document.getElementById('paste-button') as HTMLButtonElement;
export const saveButton : HTMLButtonElement = document.getElementById('save-button') as HTMLButtonElement;

export const defaultButton : HTMLButtonElement = document.getElementById('default-button') as HTMLButtonElement;
export const selectButton : HTMLButtonElement = document.getElementById('select-button') as HTMLButtonElement;
export const eraseButton : HTMLButtonElement = document.getElementById('erase-button') as HTMLButtonElement;

export const regexToggleButton : HTMLButtonElement = document.getElementById('regex-button') as HTMLButtonElement;
export const searchInput : HTMLInputElement = document.getElementById('search-tile-picker') as HTMLInputElement;


export const createTileTypeButton : HTMLButtonElement = document.getElementById('create-tile-button') as HTMLButtonElement;
export const editTileTypeButton : HTMLButtonElement = document.getElementById('edit-tile-button') as HTMLButtonElement;
export const deleteTileTypeButton : HTMLButtonElement = document.getElementById('delete-tile-button') as HTMLButtonElement;


export const stepForwardButton : HTMLButtonElement = document.getElementById('step-forward-button') as HTMLButtonElement;
export const stepBackwardButton : HTMLButtonElement = document.getElementById('step-back-button') as HTMLButtonElement;
export const resetTimeButton : HTMLButtonElement = document.getElementById('reset-time-button') as HTMLButtonElement;