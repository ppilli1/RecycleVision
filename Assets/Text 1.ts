interface TouchStartEvent {
    getTouchPosition(): { x: number, y: number };
}

class SphereTextDisplay {
    private textComp: Component.Text;
    private text: string;

    constructor() {
        if (!script.textComponent) {
            print("Error: Please assign a Text component in the Inspector.");
            return;
        }
        this.textComp = script.textComponent;
        this.text = script.displayText;
        this.initialize();
    }

    private initialize(): void {
        this.textComp.text = this.text;
        this.hideText();
        this.setupTouchEvents();
    }

    private setupTouchEvents(): void {
        const touchStartEvent = script.createEvent("TouchStartEvent");
        touchStartEvent.bind(this.onTouchStart.bind(this));

        const touchEndEvent = script.createEvent("TouchEndEvent");
        touchEndEvent.bind(this.onTouchEnd.bind(this));
    }

    private onTouchStart(event: TouchStartEvent): void {
        this.showText();
    }

    private onTouchEnd(): void {
        this.hideText();
    }

    private showText(): void {
        if (this.textComp) {
            this.textComp.enabled = true;
        }
    }

    private hideText(): void {
        if (this.textComp) {
            this.textComp.enabled = false;
        }
    }
}

const sphereTextDisplay = new SphereTextDisplay();