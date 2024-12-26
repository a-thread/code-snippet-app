import { Directive, ElementRef, Input, OnChanges, SimpleChanges, Renderer2, HostListener } from '@angular/core';
import * as Prism from 'prismjs';

@Directive({
  selector: '[appSyntaxHighlight]'
})
export class SyntaxHighlightDirective implements OnChanges {
  @Input() fileExtension!: string;

  content!: string;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['fileExtension']) {
      this.highlight();
    }
  }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string): void {
    this.content = value;
    this.highlight();
  }

  private highlight(): void {
    const language = this.getLanguage(this.fileExtension);
    console.log(language, this.content);
    if (language && this.content) {
      const innerHTML = Prism.highlight(this.content, Prism.languages[language], language);
      console.log(innerHTML)
      this.renderer.setProperty(this.el.nativeElement, 'innerHTML', innerHTML);
    }
  }

  private getLanguage(extension: string): string {
    const extensionMap: { [key: string]: string } = {
      js: 'javascript',
      ts: 'typescript',
      html: 'markup',
      css: 'css',
      json: 'json',
      xml: 'xml',
      svg: 'svg',
      md: 'markdown',
      py: 'python',
      java: 'java',
      rb: 'ruby',
      php: 'php',
      cpp: 'cpp',
      cs: 'csharp',
      go: 'go',
      rs: 'rust',
      swift: 'swift',
      kt: 'kotlin',
      sh: 'bash',
      sql: 'sql',
      yaml: 'yaml',
      yml: 'yaml',
      ini: 'ini',
      txt: 'plaintext'
    };

    return extensionMap[extension] || 'plaintext';
  }
}