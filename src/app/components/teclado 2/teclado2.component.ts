import { Component, EventEmitter, OnInit, Output, ViewEncapsulation, OnDestroy } from '@angular/core';
import Keyboard from "simple-keyboard";

@Component({
  selector: 'app-teclado2',
  templateUrl: './teclado2.component.html',
  styleUrls: ['./teclado2.component.css']
})
export class Teclado2Component implements OnInit,OnDestroy {

@Output() cambioTeclado = new EventEmitter<string>();
  constructor(){
    
  }
  
  ngOnInit(): void {
  }
    value = "";
    commonKeyboardOptions = {
      onChange: (input: string) => this.onChange(input),
      onKeyPress: (button: string) => this.onKeyPress(button),
      theme: "simple-keyboard hg-theme-default hg-layout-default",
      physicalKeyboardHighlight: true,
      syncInstanceInputs: true,
      mergeDisplay: true,
      debug: true
    };
    keyboard: Keyboard;
    keyboardNumPad: Keyboard;
    keyboardComandos: Keyboard;
  ngOnDestroy(){
  this.keyboard.destroy();
  this.keyboardNumPad.destroy();
  }
  ngAfterViewInit() {
    this.keyboard = new Keyboard(".simple-keyboard-main", {
      ...this.commonKeyboardOptions,
      /* useTouchEvents: true, */
      layout: {
        default: [
          "Q W E R T Y U I O P",
          "A S D F G H J K L {backspace}",
          "Z X C V B N M {enter}",
          "{space} .com"
        ]
      },
      display: {
        "{space}":" ",
        "{ent}": "return",
        "{escape}": "esc ⎋",
        "{tab}": "tab ⇥",
        "{backspace}": "⌫",
        "{capslock}": "caps lock ⇪",
        "{shift}": "⇧",
        "{controlleft}": "ctrl ⌃",
        "{controlright}": "ctrl ⌃",
        "{altleft}": "alt ⌥",
        "{altright}": "alt ⌥",
        "{metaleft}": "cmd ⌘",
        "{metaright}": "cmd ⌘",
        "{abc}": "ABC",
        "{enter}":"Intro ↵"
      },
      buttonTheme: [
        {
          class: "hg-red",
          buttons: "Q W E R T Y q w e r t y"
        }
      ]
    });

    this.keyboardNumPad = new Keyboard(".simple-keyboard-numpad", {
      ...this.commonKeyboardOptions,
      layout: {
        default: [
          "{numpad7} {numpad8} {numpad9}",
          "{numpad4} {numpad5} {numpad6}",
          "{numpad1} {numpad2} {numpad3}",
          "{numpad0} {backspace}"
        ]
      },
      display: {
        "{null}": "  ",
        "{space}":" ",
        "{ent}": "return",
        "{escape}": "esc ⎋",
        "{tab}": "tab ⇥",
        "{backspace}": "⌫",
        "{capslock}": "caps lock ⇪",
        "{shift}": "⇧",
        "{controlleft}": "ctrl ⌃",
        "{controlright}": "ctrl ⌃",
        "{altleft}": "alt ⌥",
        "{altright}": "alt ⌥",
        "{metaleft}": "cmd ⌘",
        "{metaright}": "cmd ⌘",
        "{abc}": "ABC",
        "{enter}":"Intro ↵"
      }
    });
  }

  onChange = (input: string) => {
    this.value = input;
    this.cambioTeclado.emit(this.value);
    console.log(this.value);
  };

  onKeyPress = (button: string) => {
     if (button === "{shift}") this.handleShift();
  };

  onInputChange = (event: any) => {
    this.keyboard.setInput(event.target.value);
    console.log(event.target.value);
  };

  handleShift = () => {
    let currentLayout = this.keyboard.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "shift" : "default";

    this.keyboard.setOptions({
      layoutName: shiftToggle
    });
  };
  
}
