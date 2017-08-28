import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  private xposprv: any;
  private yposprv: any;
  private xposprvmouse: any;
  private yposprvmouse: any;
  private xposoff: any = 0;
  private yposoff: any = 0;
  @ViewChild('layout') canvas: ElementRef;
  private ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  key: any;
  image: any;
  constructor(canvas: ElementRef) {
    this.width = window.innerWidth - window.innerWidth / 4;
    this.height = window.innerHeight - window.innerHeight / 4;
  }
  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
     this.initialPosition();
  }
  ngAfterViewInit() {
    //this.initialPosition();
  }

  initialPosition() {
    if (this.ctx) {
      this.clear();
    }
    let initialwidth = parseInt(((this.width / 2) - 20).toString()), initialheight = parseInt((this.height - 40).toString());
    this.xposprv = initialwidth;
    this.xposprvmouse = initialwidth;
    this.yposprv = initialheight;
    this.yposprvmouse = initialheight;
    this.image = new Image();
    this.image.src = "//www.kirupa.com/images/smiley_red.png";
    console.log('ctx', this.ctx);
    this.image.onload = () => {
      this.ctx.drawImage(this.image, initialwidth, initialheight, 40, 40);
    }
  }
  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
  captureCoordinate(event: any) {
    if ((event.offsetX + 41) < this.width && (event.offsetY + 40) < this.height && event.offsetY >= 0 && event.offsetX >= 0) {
      this.clear();
      this.xposoff = event.offsetX;
      this.yposoff = event.offsetY;
      if (this.xposprv > this.xposoff) {
        let xdiff = this.xposprvmouse - this.xposoff;
        if (this.yposprv > this.yposoff) {
          let ydiff = this.yposprvmouse - this.yposoff;
          // alert(xdiff + "/" + ydiff);
          this.ctx.drawImage(this.image, this.xposprv - xdiff, this.yposprv - ydiff, 40, 40);
          this.yposprv = this.yposprv - ydiff;
        }
        else {
          let ydiff = this.yposoff - this.yposprvmouse;
          //alert(xdiff+"/"+ydiff);
          this.ctx.drawImage(this.image, this.xposprv - xdiff, this.yposprv + ydiff, 40, 40);
          this.yposprv = this.yposprv + ydiff;
        }
        this.xposprv = this.xposprv - xdiff;
      }
      else {
        let xdiff = this.xposoff - this.xposprvmouse;
        if (this.yposprv > this.yposoff) {
          let ydiff = this.yposprv - this.yposoff;
          //alert(xdiff+"/"+ydiff);
          this.ctx.drawImage(this.image, this.xposprv + xdiff, this.yposprv - ydiff, 40, 40);
          this.yposprv = this.yposprv - ydiff;
        }
        else {
          let ydiff = this.yposoff - this.yposprvmouse;
          //alert(xdiff+"/"+ydiff);
          this.ctx.drawImage(this.image, this.xposprv + xdiff, this.yposprv + ydiff, 40, 40);
          this.yposprv = this.yposprv + ydiff;
        }
        this.xposprv = this.xposprv + xdiff;
      }
      this.xposprvmouse = event.offsetX;
      this.yposprvmouse = event.offsetY;
    }
    else {
      alert("Can't Cross the Bounder!!!");
    }
  }

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    //console.log(event.type + event.keyCode);
    this.key = event.keyCode;
    if (this.key == 37 && this.key && this.xposprv > 0) {
      this.clear();
      // console.log(event.type + this.key);
      this.xposprv--;
      this.xposprvmouse--;
    }
    else if (this.key == 38 && this.key && this.yposprv > 0) {
      this.clear();
      this.yposprv--;
      this.yposprvmouse--;
    }
    else if (this.key == 39 && this.key && (this.xposprv + 41) < this.width) {
      this.clear();
      this.xposprv++;
      this.xposprvmouse++;
    }
    else if (this.key == 40 && this.key && (this.yposprv + 40) < this.height) {
      this.clear();
      this.yposprv++;
      this.yposprvmouse++;
    }
    this.ctx.drawImage(this.image, this.xposprv, this.yposprv, 40, 40);
  }
  @HostListener('window:keyup', ['$event'])
  keyEvent1(event: KeyboardEvent) {
    this.key = false;
    // console.log(event.type + this.key);
  }
  @HostListener('window:resize')
  resize() {
    this.width = window.innerWidth - window.innerWidth / 4;
    this.height = window.innerHeight - window.innerHeight / 4;
    this.clear();
    this.initialPosition();
  }
}
