"use strict";(self.webpackChunkCONTROL_P=self.webpackChunkCONTROL_P||[]).push([[470],{3887:(D,I,h)=>{h.d(I,{G:()=>k});var n=h(177),t=h(1261),g=h(7735),C=h(1360),y=h(7705);let k=(()=>{class b{static{this.\u0275fac=function(f){return new(f||b)}}static{this.\u0275mod=y.$C({type:b})}static{this.\u0275inj=y.G2t({imports:[n.MD,t.iI,g.h,C.MB]})}}return b})()},3474:(D,I,h)=>{h.d(I,{Ph:()=>T,gj:()=>M});var n=h(7705),t=h(9417),g=h(177),C=h(1413),y=h(6977);function k(r,u){if(1&r&&(n.j41(0,"span"),n.EFF(1),n.k0s()),2&r){const e=n.XpG(3);n.R7$(1),n.SpI(" ",e.config.separator," ")}}const b=function(r){return{"error-input":r}};function O(r,u){if(1&r){const e=n.RV6();n.qex(0),n.j41(1,"input",4,5),n.bIt("paste",function(i){n.eBV(e);const a=n.XpG(2);return n.Njj(a.handlePaste(i))})("keyup",function(i){const d=n.eBV(e).index,s=n.XpG(2);return n.Njj(s.onKeyUp(i,d))})("input",function(i){const d=n.eBV(e).index,s=n.XpG(2);return n.Njj(s.onInput(i,d))})("keydown",function(i){const d=n.eBV(e).index,s=n.XpG(2);return n.Njj(s.onKeyDown(i,d))}),n.k0s(),n.DNE(3,k,2,1,"span",6),n.bVm()}if(2&r){const e=u.$implicit,o=u.index,i=u.last,a=n.XpG(2);n.R7$(1),n.ZvI("otp-input ",a.config.inputClass,""),n.Y8G("pattern",a.config.allowNumbersOnly?"\\d*":"")("type",a.inputType)("placeholder",(null==a.config?null:a.config.placeholder)||"")("ngStyle",a.config.inputStyles)("formControl",a.otpForm.controls[e])("id",a.getBoxId(o))("ngClass",n.eq3(11,b,(null==a.config?null:a.config.showError)&&(null==a.formCtrl?null:a.formCtrl.invalid)&&((null==a.formCtrl?null:a.formCtrl.dirty)||(null==a.formCtrl?null:a.formCtrl.touched)))),n.R7$(2),n.Y8G("ngIf",a.config.separator&&!i)}}function E(r,u){if(1&r){const e=n.RV6();n.j41(0,"div",1),n.bIt("focusin",function(){n.eBV(e);const i=n.XpG();return n.Njj(i.onFocusIn())})("focusout",function(){n.eBV(e);const i=n.XpG();return n.Njj(i.onFocusOut())}),n.j41(1,"div",2),n.DNE(2,O,4,13,"ng-container",3),n.k0s()()}if(2&r){const e=n.XpG();n.ZvI("ng-otp-input-wrapper wrapper ",e.config.containerClass,""),n.Mz_("id","c_",e.componentKey,""),n.Y8G("ngStyle",e.config.containerStyles),n.R7$(2),n.Y8G("ngForOf",e.controlKeys)}}class f{static ifTab(u){return this.ifKey(u,"Tab")}static ifDelete(u){return this.ifKey(u,"Delete;Del")}static ifBackspace(u){return this.ifKey(u,"Backspace")}static ifRightArrow(u){return this.ifKey(u,"ArrowRight;Right")}static ifLeftArrow(u){return this.ifKey(u,"ArrowLeft;Left")}static ifSpacebar(u){return this.ifKey(u,"Spacebar; ")}static ifKey(u,e){return e.split(";").some(i=>i===u.key)}}class x{static keys(u){return u?Object.keys(u):[]}}let M=(()=>{class r{set disabled(e){this.setDisabledState(e)}get inputType(){return this.config?.isPasswordInput?"password":this.config?.allowNumbersOnly?"tel":"text"}get controlKeys(){return x.keys(this.otpForm?.controls)}constructor(e){this.document=e,this.config={length:4},this.onBlur=new C.B,this.onInputChange=new C.B,this.inputControls=new Array(this.config.length),this.componentKey=Math.random().toString(36).substring(2)+(new Date).getTime().toString(36),this.destroy$=new C.B,this.activeFocusCount=0,this.onChange=()=>{},this.onTouched=()=>{},this._isDisabled=!1}ngOnInit(){this.otpForm=new t.gE({});for(let e=0;e<this.config.length;e++)this.otpForm.addControl(this.getControlName(e),new t.MJ);this.otpForm.valueChanges.pipe((0,y.Q)(this.destroy$)).subscribe(e=>{x.keys(this.otpForm.controls).forEach(o=>{var i=this.otpForm.controls[o].value;i&&i.length>1&&(i.length>=this.config.length?this.setValue(i):this.rebuildValue())})})}setDisabledState(e){this._isDisabled=e,this.otpForm&&(e?this.otpForm.disable({emitEvent:!1}):this.otpForm.enable({emitEvent:!1}))}writeValue(e){this.currentVal=e||null,this.otpForm&&this.currentVal&&this.setValue(this.currentVal)}registerOnChange(e){this.onChange=e}registerOnTouched(e){this.onTouched=e}onFocusIn(){this.onTouched(),this.activeFocusCount++}onFocusOut(){setTimeout(()=>{this.activeFocusCount--,0===this.activeFocusCount&&(this.onTouched(),this.onBlur.next())},0)}ngAfterViewInit(){if(!this.config.disableAutoFocus){const e=this.document.getElementById(`c_${this.componentKey}`);if(e){const o=e.getElementsByClassName("otp-input")[0];o&&o.focus&&o.focus()}}}getControlName(e){return`ctrl_${e}`}onKeyDown(e,o){const i=this.getBoxId(o-1),a=this.getBoxId(o),d=this.getBoxId(o+1);if(f.ifSpacebar(e))return e.preventDefault(),!1;if(f.ifBackspace(e))return e.target.value?this.clearInput(a,o):(this.clearInput(i,o-1),this.setSelected(i)),void this.rebuildValue();if(f.ifDelete(e))return e.target.value?this.clearInput(a,o):(this.clearInput(i,o-1),this.setSelected(i)),void this.rebuildValue();if(this.ifValidKeyCode(e)){e.target.value=e.key;let s=this.getControlName(o);this.otpForm.controls[s]?.setValue(e.key),e.preventDefault(),this.setSelected(d),this.rebuildValue()}}onInput(e,o){if(this.config.allowNumbersOnly&&!this.validateNumber(this.currentVal?`${this.currentVal}${e.target.value}`:e.target.value))return e.target.value=null,e.stopPropagation(),e.preventDefault(),void this.clearInput(null,o)}onKeyUp(e,o){f.ifTab(e)&&(o-=1);const i=this.getBoxId(o+1),a=this.getBoxId(o-1);return f.ifRightArrow(e)?(e.preventDefault(),void this.setSelected(i)):f.ifLeftArrow(e)?(e.preventDefault(),void this.setSelected(a)):void 0}validateNumber(e){return e&&/^[0-9]+$/.test(e)}getBoxId(e){return`otp_${e}_${this.componentKey}`}clearInput(e,o){let i=this.getControlName(o);if(this.otpForm.controls[i]?.setValue(null),e){const a=this.document.getElementById(e);a&&a instanceof HTMLInputElement&&(a.value=null)}}setSelected(e){this.focusTo(e);const o=this.document.getElementById(e);o&&o.setSelectionRange&&setTimeout(()=>{o.setSelectionRange(0,1)},0)}ifValidKeyCode(e){const o=e.key;return this.config?.allowNumbersOnly?this.validateNumber(o):/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)||/^[a-zA-Z0-9%*_\-@#$!]$/.test(o)&&1==o.length}focusTo(e){const o=this.document.getElementById(e);o&&o.focus()}setValue(e){if(!this.config.allowNumbersOnly||!isNaN(e)){if(this.otpForm.reset(),!e)return void this.rebuildValue();e=e.toString().replace(/\s/g,""),Array.from(e).forEach((o,i)=>{this.otpForm.get(this.getControlName(i))&&this.otpForm.get(this.getControlName(i)).setValue(o)}),this.config.disableAutoFocus||setTimeout(()=>{const o=this.document.getElementById(`c_${this.componentKey}`);var i=e.length<this.config.length?e.length:this.config.length-1;let a=o.getElementsByClassName("otp-input")[i];a&&a.focus&&setTimeout(()=>{a.focus()},1)},0),this.rebuildValue()}}rebuildValue(){let e=null;x.keys(this.otpForm.controls).forEach(o=>{let i=this.otpForm.controls[o].value;if(i){let a=i.length>1,d=!this.config.allowNumbersOnly&&this.config.letterCase&&("upper"==this.config.letterCase.toLocaleLowerCase()||"lower"==this.config.letterCase.toLocaleLowerCase());i=i[0];let s=d?"upper"==this.config.letterCase.toLocaleLowerCase()?i.toUpperCase():i.toLowerCase():i;d&&s==i?d=!1:i=s,null==e?e=i:e+=i,(a||d)&&this.otpForm.controls[o].setValue(i)}}),this.currentVal!=e&&(this.currentVal=e,this.onChange(e),this.formCtrl?.setValue&&this.formCtrl.setValue(e),this.onInputChange.next(e))}handlePaste(e){let o=e.clipboardData||window.clipboardData;if(o)var i=o.getData("Text");e.stopPropagation(),e.preventDefault(),i&&(!this.config.allowNumbersOnly||this.validateNumber(i))&&this.setValue(i)}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}static{this.\u0275fac=function(o){return new(o||r)(n.rXU(g.qQ))}}static{this.\u0275cmp=n.VBU({type:r,selectors:[["ng-otp-input"],["ngx-otp-input"]],inputs:{config:"config",formCtrl:"formCtrl",disabled:"disabled"},outputs:{onBlur:"onBlur",onInputChange:"onInputChange"},standalone:!0,features:[n.Jv_([{provide:t.kq,useExisting:(0,n.Rfq)(()=>r),multi:!0}]),n.aNF],decls:1,vars:1,consts:[["tabindex","0",3,"class","id","ngStyle","focusin","focusout",4,"ngIf"],["tabindex","0",3,"id","ngStyle","focusin","focusout"],[1,"n-o-c"],[4,"ngFor","ngForOf"],["autocomplete","one-time-code",3,"pattern","type","placeholder","ngStyle","formControl","id","ngClass","paste","keyup","input","keydown"],["inp",""],[4,"ngIf"]],template:function(o,i){1&o&&n.DNE(0,E,3,6,"div",0),2&o&&n.Y8G("ngIf",null==i.otpForm?null:i.otpForm.controls)},dependencies:[t.X1,t.me,t.BC,t.R_,t.l_,g.bT,g.pM,g.B3,g.YU],styles:[".otp-input[_ngcontent-%COMP%]{width:50px;height:50px;border-radius:4px;border:solid 1px #c5c5c5;text-align:center;font-size:32px}.ng-otp-input-wrapper[_ngcontent-%COMP%]   .otp-input[_ngcontent-%COMP%]{margin:0 .51rem}.ng-otp-input-wrapper[_ngcontent-%COMP%]   .otp-input[_ngcontent-%COMP%]:first-child{margin-left:0}.ng-otp-input-wrapper[_ngcontent-%COMP%]   .otp-input[_ngcontent-%COMP%]:last-child{margin-right:0}.n-o-c[_ngcontent-%COMP%]{display:flex;align-items:center}.error-input[_ngcontent-%COMP%]{border-color:red}@media screen and (max-width: 767px){.otp-input[_ngcontent-%COMP%]{width:40px;font-size:24px;height:40px}}@media screen and (max-width: 420px){.otp-input[_ngcontent-%COMP%]{width:30px;font-size:18px;height:30px}}"]})}}return r})(),T=(()=>{class r{static{this.\u0275fac=function(o){return new(o||r)}}static{this.\u0275mod=n.$C({type:r})}static{this.\u0275inj=n.G2t({imports:[M]})}}return r})()},5430:(D,I,h)=>{h.d(I,{Sc:()=>a,q4:()=>d});var n=h(177),t=h(7705),g=h(9417),C=h(5779),y=h(3306),k=h(4420);const b=["input"];function O(s,_){if(1&s&&t.nrm(0,"span",10),2&s){const l=t.XpG(3);t.Y8G("ngClass",l.checkboxIcon),t.BMQ("data-pc-section","icon")}}function E(s,_){1&s&&t.nrm(0,"CheckIcon",11),2&s&&(t.Y8G("styleClass","p-checkbox-icon"),t.BMQ("data-pc-section","icon"))}function f(s,_){if(1&s&&(t.qex(0),t.DNE(1,O,1,2,"span",8),t.DNE(2,E,1,2,"CheckIcon",9),t.bVm()),2&s){const l=t.XpG(2);t.R7$(1),t.Y8G("ngIf",l.checkboxIcon),t.R7$(1),t.Y8G("ngIf",!l.checkboxIcon)}}function x(s,_){}function M(s,_){1&s&&t.DNE(0,x,0,0,"ng-template")}function T(s,_){if(1&s&&(t.j41(0,"span",12),t.DNE(1,M,1,0,null,13),t.k0s()),2&s){const l=t.XpG(2);t.BMQ("data-pc-section","icon"),t.R7$(1),t.Y8G("ngTemplateOutlet",l.checkboxIconTemplate)}}function B(s,_){if(1&s&&(t.qex(0),t.DNE(1,f,3,2,"ng-container",5),t.DNE(2,T,2,2,"span",7),t.bVm()),2&s){const l=t.XpG();t.R7$(1),t.Y8G("ngIf",!l.checkboxIconTemplate),t.R7$(1),t.Y8G("ngIf",l.checkboxIconTemplate)}}const r=function(s,_,l){return{"p-checkbox-label":!0,"p-checkbox-label-active":s,"p-disabled":_,"p-checkbox-label-focus":l}};function u(s,_){if(1&s){const l=t.RV6();t.j41(0,"label",14),t.bIt("click",function(c){t.eBV(l);const m=t.XpG();return t.Njj(m.onClick(c))}),t.EFF(1),t.k0s()}if(2&s){const l=t.XpG();t.HbH(l.labelStyleClass),t.Y8G("ngClass",t.sMw(6,r,l.checked(),l.disabled,l.focused)),t.BMQ("for",l.inputId)("data-pc-section","label"),t.R7$(1),t.SpI(" ",l.label,"")}}const e=function(s,_,l){return{"p-checkbox p-component":!0,"p-checkbox-checked":s,"p-checkbox-disabled":_,"p-checkbox-focused":l}},o=function(s,_,l){return{"p-highlight":s,"p-disabled":_,"p-focus":l}},i={provide:g.kq,useExisting:(0,t.Rfq)(()=>a),multi:!0};let a=(()=>{class s{cd;value;name;disabled;binary;label;ariaLabelledBy;ariaLabel;tabindex;inputId;style;styleClass;labelStyleClass;formControl;checkboxIcon;readonly;required;trueValue=!0;falseValue=!1;onChange=new t.bkB;inputViewChild;templates;checkboxIconTemplate;model;onModelChange=()=>{};onModelTouched=()=>{};focused=!1;constructor(l){this.cd=l}ngAfterContentInit(){this.templates.forEach(l=>{"icon"===l.getType()&&(this.checkboxIconTemplate=l.template)})}onClick(l){if(!this.disabled&&!this.readonly){let p;this.inputViewChild.nativeElement.focus(),this.binary?(p=this.checked()?this.falseValue:this.trueValue,this.model=p,this.onModelChange(p)):(p=this.checked()?this.model.filter(c=>!k.BF.equals(c,this.value)):this.model?[...this.model,this.value]:[this.value],this.onModelChange(p),this.model=p,this.formControl&&this.formControl.setValue(p)),this.onChange.emit({checked:p,originalEvent:l})}}onFocus(){this.focused=!0}onBlur(){this.focused=!1,this.onModelTouched()}writeValue(l){this.model=l,this.cd.markForCheck()}registerOnChange(l){this.onModelChange=l}registerOnTouched(l){this.onModelTouched=l}setDisabledState(l){this.disabled=l,this.cd.markForCheck()}checked(){return this.binary?this.model===this.trueValue:k.BF.contains(this.value,this.model)}static \u0275fac=function(p){return new(p||s)(t.rXU(t.gRc))};static \u0275cmp=t.VBU({type:s,selectors:[["p-checkbox"]],contentQueries:function(p,c,m){if(1&p&&t.wni(m,C.Ei,4),2&p){let v;t.mGM(v=t.lsd())&&(c.templates=v)}},viewQuery:function(p,c){if(1&p&&t.GBs(b,5),2&p){let m;t.mGM(m=t.lsd())&&(c.inputViewChild=m.first)}},hostAttrs:[1,"p-element"],inputs:{value:"value",name:"name",disabled:"disabled",binary:"binary",label:"label",ariaLabelledBy:"ariaLabelledBy",ariaLabel:"ariaLabel",tabindex:"tabindex",inputId:"inputId",style:"style",styleClass:"styleClass",labelStyleClass:"labelStyleClass",formControl:"formControl",checkboxIcon:"checkboxIcon",readonly:"readonly",required:"required",trueValue:"trueValue",falseValue:"falseValue"},outputs:{onChange:"onChange"},features:[t.Jv_([i])],decls:7,vars:35,consts:[[3,"ngStyle","ngClass","click"],[1,"p-hidden-accessible"],["type","checkbox",3,"value","checked","disabled","readonly","focus","blur"],["input",""],[1,"p-checkbox-box",3,"ngClass"],[4,"ngIf"],[3,"class","ngClass","click",4,"ngIf"],["class","p-checkbox-icon",4,"ngIf"],["class","p-checkbox-icon",3,"ngClass",4,"ngIf"],[3,"styleClass",4,"ngIf"],[1,"p-checkbox-icon",3,"ngClass"],[3,"styleClass"],[1,"p-checkbox-icon"],[4,"ngTemplateOutlet"],[3,"ngClass","click"]],template:function(p,c){1&p&&(t.j41(0,"div",0),t.bIt("click",function(v){return c.onClick(v)}),t.j41(1,"div",1)(2,"input",2,3),t.bIt("focus",function(){return c.onFocus()})("blur",function(){return c.onBlur()}),t.k0s()(),t.j41(4,"div",4),t.DNE(5,B,3,2,"ng-container",5),t.k0s()(),t.DNE(6,u,2,10,"label",6)),2&p&&(t.HbH(c.styleClass),t.Y8G("ngStyle",c.style)("ngClass",t.sMw(27,e,c.checked(),c.disabled,c.focused)),t.BMQ("data-pc-name","checkbox")("data-pc-section","root"),t.R7$(1),t.BMQ("data-pc-section","hiddenInputWrapper")("data-p-hidden-accessible",!0),t.R7$(1),t.Y8G("value",c.value)("checked",c.checked())("disabled",c.disabled)("readonly",c.readonly),t.BMQ("id",c.inputId)("name",c.name)("tabindex",c.tabindex)("required",c.required)("aria-labelledby",c.ariaLabelledBy)("aria-label",c.ariaLabel)("aria-checked",c.checked())("data-pc-section","hiddenInput"),t.R7$(2),t.Y8G("ngClass",t.sMw(31,o,c.checked(),c.disabled,c.focused)),t.BMQ("data-p-highlight",c.checked())("data-p-disabled",c.disabled)("data-p-focused",c.focused)("data-pc-section","input"),t.R7$(1),t.Y8G("ngIf",c.checked()),t.R7$(1),t.Y8G("ngIf",c.label))},dependencies:function(){return[n.YU,n.bT,n.T3,n.B3,y.S]},styles:["@layer primeng{.p-checkbox{display:inline-flex;cursor:pointer;-webkit-user-select:none;user-select:none;vertical-align:bottom;position:relative}.p-checkbox-disabled{cursor:default!important;pointer-events:none}.p-checkbox-box{display:flex;justify-content:center;align-items:center}p-checkbox{display:inline-flex;vertical-align:bottom;align-items:center}.p-checkbox-label{line-height:1}}\n"],encapsulation:2,changeDetection:0})}return s})(),d=(()=>{class s{static \u0275fac=function(p){return new(p||s)};static \u0275mod=t.$C({type:s});static \u0275inj=t.G2t({imports:[n.MD,y.S,C.Gg]})}return s})()}}]);