import { reloadCachedButton, syncCacheButton } from "./elements";
import { PlaneTiling, type WangFile } from "./logic";
import { UIState } from "./UI";
import { doNothingWith } from "./util";

export function UpdateCacheButtons(ui_state: UIState, wf: WangFile): void
{
	if(PlaneTiling.equals(wf.mainPlaneTiling,wf.cachedPlaneTiling))
	{
		syncCacheButton.disabled = true
		reloadCachedButton.disabled = true
	}
	else
	{
		syncCacheButton.disabled = false
		reloadCachedButton.disabled = false
	}
	doNothingWith(ui_state)
}


export function setUpCacheButtons(ui_state: UIState, wf: WangFile): void
{
	syncCacheButton.addEventListener("click",()=>{
		wf.cachedPlaneTiling = PlaneTiling.copy(wf.mainPlaneTiling)
		UpdateCacheButtons(ui_state,wf)
	})
	reloadCachedButton.addEventListener("click",()=>
	{
		wf.mainPlaneTiling = PlaneTiling.copy(wf.cachedPlaneTiling)
		UpdateCacheButtons(ui_state,wf)
	})
}