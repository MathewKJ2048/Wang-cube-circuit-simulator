
export const canvas : HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
export const ctx : CanvasRenderingContext2D = canvas.getContext('2d')!;


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
export const placeButton : HTMLButtonElement = document.getElementById('place-button') as HTMLButtonElement;

export const regexToggleButton : HTMLButtonElement = document.getElementById('regex-button') as HTMLButtonElement;
export const searchInput : HTMLInputElement = document.getElementById('search-picker') as HTMLInputElement;


export const createPickerButton : HTMLButtonElement = document.getElementById('create-picker-button') as HTMLButtonElement;
export const deletePickerButton : HTMLButtonElement = document.getElementById('delete-picker-button') as HTMLButtonElement;
export const copyPickerButton : HTMLButtonElement = document.getElementById('copy-picker-button') as HTMLButtonElement;
export const flipPickerButton : HTMLButtonElement = document.getElementById('flip-picker-button') as HTMLButtonElement;
export const cwPickerButton : HTMLButtonElement = document.getElementById('rotate-cw-picker-button') as HTMLButtonElement;
export const ccwPickerButton : HTMLButtonElement = document.getElementById('rotate-ccw-picker-button') as HTMLButtonElement;


export const stepForwardButton : HTMLButtonElement = document.getElementById('step-forward-button') as HTMLButtonElement;
export const stepBackwardButton : HTMLButtonElement = document.getElementById('step-backward-button') as HTMLButtonElement;
export const reloadCachedButton : HTMLButtonElement = document.getElementById('reload-cached-button') as HTMLButtonElement;
export const syncCacheButton : HTMLButtonElement = document.getElementById('sync-cache-button') as HTMLButtonElement;


export const nameInput : HTMLInputElement = document.getElementById('editor-name') as HTMLInputElement;
export const classesInput : HTMLInputElement = document.getElementById('editor-classes') as HTMLInputElement;
export const upInput : HTMLInputElement = document.getElementById('editor-up') as HTMLInputElement;
export const downInput : HTMLInputElement = document.getElementById('editor-down') as HTMLInputElement;
export const leftInput : HTMLInputElement = document.getElementById('editor-left') as HTMLInputElement;
export const rightInput : HTMLInputElement = document.getElementById('editor-right') as HTMLInputElement;
export const frontInput : HTMLInputElement = document.getElementById('editor-front') as HTMLInputElement;
export const backInput : HTMLInputElement = document.getElementById('editor-back') as HTMLInputElement;


export const colorPickerName : HTMLInputElement = document.getElementById('color-chooser-name') as HTMLInputElement;
export const colorPickerUp : HTMLInputElement = document.getElementById('color-chooser-up') as HTMLInputElement;
export const colorPickerDown : HTMLInputElement = document.getElementById('color-chooser-down') as HTMLInputElement;
export const colorPickerLeft : HTMLInputElement = document.getElementById('color-chooser-left') as HTMLInputElement;
export const colorPickerRight : HTMLInputElement = document.getElementById('color-chooser-right') as HTMLInputElement;
export const colorPickerFront : HTMLInputElement = document.getElementById('color-chooser-front') as HTMLInputElement;
export const colorPickerBack : HTMLInputElement = document.getElementById('color-chooser-back') as HTMLInputElement;