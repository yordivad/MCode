declare class  PolymerGestures {
   static addEventListener(obj1: any, obj2: any, item:any);
}


@component("flow-navigation")
class Navigation extends polymer.Base {

    @property({ type: Number, value: 200 })
    width: number;

    @property({ type: Number, value: 150 })
    height: number;

    @property({ type: Boolean, value: false })
    hide: boolean;

    @property({ type: Number, value: 1 })
    thumbscale: number;

    @property({ type: String, value: "hsla(184, 8%, 75%, 0.9)" })
    backgroundColor: string;

    @property({ type: String, value: "hsla(0, 0%, 0%, 0.4)" })
    outsideFill: string;

    viewrectangle: any;

    scaledviewrectangle: any;
    @property({ type: String, value: "dark" })
    theme: string;

    scale: number;
    viewBoxBorder: string;
    viewBoxBorder2: string;
    thumbrectangle: any;
    editor: any;

    ready() {
        this.viewrectangle = [0, 0, 500, 500];
        this.scaledviewrectangle = [0, 0, 200, 150];
    }

    attached() {
        this.style.overflow = "hidden";
        this.style.cursor = "move";
        this.style.width = this.width + "px";
        this.style.height = this.height + "px";

        // HACK way to make PolymerGestures work for now
        var noop = () => {};
        PolymerGestures.addEventListener(this, "track", noop);
        PolymerGestures.addEventListener(this, "trackend", noop);
        PolymerGestures.addEventListener(this, "tap", noop);

        // Pan graph by dragging map
        this.addEventListener("track", ((event) => {
            if (!this.editor) {
                return;
            }
            // Don't pan graph
            event.stopPropagation();

            var x = this.editor.pan[0];
            var y = this.editor.pan[1];
            var panscale = this.thumbscale / this.editor.scale;
            x -= event.ddx / panscale;
            y -= event.ddy / panscale;
            this.editor.pan = [Math.round(x), Math.round(y)];

            event.preventTap();
        }).bind(this));
        this.addEventListener("trackend", ((event) => {
            // Don't pan graph
            event.stopPropagation();
        }).bind(this));

        // Tap to fit
        this.addEventListener("tap", () => {
            if (!this.editor) {
                return;
            }
            this.editor.triggerFit();
        });
    }

    editorChanged(oldEditor, newEditor) {
    }

    @observe("editor.pan")
    editorPanChanged() {
        if (!this.editor.pan) {
            return;
        }
        var x = this.editor.pan[0];
        var y = this.editor.pan[1];

        this.viewrectangle[0] = -x;
        this.viewrectangle[1] = -y;
    }

    @observe("editor.width")
    editorWidthChanged() {
        this.viewrectangle[2] = parseInt(this.editor.width, 10);
    }

    @observe("editor.height")
    editorHeightChanged() {
        this.viewrectangle[3] = parseInt(this.editor.height, 10);
    }

    editorScaleChanged() {
        this.scale = this.editor.scale;
    }

    editorThemeChanged() {
        if (this.editor.theme === "dark") {
            this.viewBoxBorder = "hsla(190, 100%, 80%, 0.4)";
            this.viewBoxBorder2 = "hsla( 10,  60%, 32%, 0.3)";
            this.outsideFill = "hsla(0, 0%, 0%, 0.4)";
            this.backgroundColor = "hsla(0, 0%, 0%, 0.9)";
        } else {
            this.viewBoxBorder = "hsla(190, 100%, 20%, 0.8)";
            this.viewBoxBorder2 = "hsla( 10,  60%, 80%, 0.8)";
            this.outsideFill = "hsla(0, 0%, 100%, 0.4)";
            this.backgroundColor = "hsla(0, 0%, 100%, 0.9)";
        }
        this.style.backgroundColor = this.backgroundColor;
        this.viewrectangleChanged();
    }

    viewrectangleChanged() {
        // Canvas to grey out outside view
        var context = this.$.outcanvas.getContext('2d');
        //context = unwrap(context);
        context.clearRect(0, 0, this.width, this.height);
        context.fillStyle = this.outsideFill;

        // Scaled view rectangle
        var x = Math.round((this.viewrectangle[0] / this.scale - this.thumbrectangle[0]) * this.thumbscale);
        var y = Math.round((this.viewrectangle[1] / this.scale - this.thumbrectangle[1]) * this.thumbscale);
        var w = Math.round(this.viewrectangle[2] * this.thumbscale / this.scale);
        var h = Math.round(this.viewrectangle[3] * this.thumbscale / this.scale);

        if (x < 0 && y < 0 && w > this.width - x && h > this.height - y) {
            // Hide map
            this.hide = true;
            return;
        } else {
            // Show map
            this.hide = false;
        }

        // Clip to bounds
        // Left
        if (x < 0) {
            w += x;
            x = 0;
            this.$.viewrect.style.borderLeftColor = this.viewBoxBorder2;
        } else {
            this.$.viewrect.style.borderLeftColor = this.viewBoxBorder;
            context.fillRect(0, 0, x, this.height);
        }
        // Top
        if (y < 0) {
            h += y;
            y = 0;
            this.$.viewrect.style.borderTopColor = this.viewBoxBorder2;
        } else {
            this.$.viewrect.style.borderTopColor = this.viewBoxBorder;
            context.fillRect(x, 0, w, y);
        }
        // Right
        if (w > this.width - x) {
            w = this.width - x;
            this.$.viewrect.style.borderRightColor = this.viewBoxBorder2;
        } else {
            this.$.viewrect.style.borderRightColor = this.viewBoxBorder;
            context.fillRect(x + w, 0, this.width - (x + w), this.height);
        }
        // Bottom
        if (h > this.height - y) {
            h = this.height - y;
            this.$.viewrect.style.borderBottomColor = this.viewBoxBorder2;
        } else {
            this.$.viewrect.style.borderBottomColor = this.viewBoxBorder;
            context.fillRect(x, y + h, w, this.height - (y + h));
        }

        // Size and translate rect
        this.$.viewrect.style.left = x + "px";
        this.$.viewrect.style.top = y + "px";
        this.$.viewrect.style.width = w + "px";
        this.$.viewrect.style.height = h + "px";
        // this.scaledviewrectangle = [x, y, w, h];
    }

    hideChanged() {
        if (this.hide) {
            this.style.display = "none";
        } else {
            this.style.display = "block";
        }
    }

    thumbscaleChanged() {
        this.viewrectangleChanged();
    }

    thumbrectangleChanged() {
        // Binding this from the-graph-thumb to know the dimensions rendered
        var w = this.thumbrectangle[2];
        var h = this.thumbrectangle[3];
        this.thumbscale = (w > h) ? this.width / w : this.height / h;
    }

}

Navigation.register();