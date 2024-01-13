type PyramidOptions = {
  size: number;
  offset: number;
  chars: string[];
  reverse: boolean;
  reflect: boolean;
  spaceout: number;
  position: "left" | "center" | "right";
  fill: boolean;
};

class Pyramid {
  constructor(
    private options: PyramidOptions = {
      size: 5,
      offset: 0,
      chars: ["*"],
      reverse: false,
      reflect: false,
      spaceout: 0,
      position: "center",
      fill: true,
    },
  ) {}

  public draw(): void {
    console.log(this.build().join("\n"));
  }

  public build(): string[] {
    this.options.chars = this.options.chars.map(
      (char) => (char += " ".repeat(this.options.spaceout)),
    );

    const { size, offset, chars, reverse, reflect, spaceout, position, fill } =
      this.options;

    let output: string[] = [];

    for (let i = 1; i <= size; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];

      let spaceFactor: number = 0;

      switch (position) {
        case "center":
        case "right":
          spaceFactor = 1;
          break;
        case "left":
        default:
          break;
      }

      const space = " "
        .repeat(char.length)
        .repeat((size - i) * spaceFactor + offset);
      let line = "";

      for (let j = 1; j <= i * (position !== "center" ? 1 : 2) - 1; j++) {
        line += chars[Math.floor(Math.random() * chars.length)];
      }

      if (
        fill === false &&
        line.length > char.length &&
        (i !== size || (reverse === false && reflect === true))
      ) {
        line =
          char + " ".repeat(line.slice(1, -2).length + spaceout - 2) + char;
      }

      output.push(`${space}${line}`);
    }

    if (reverse) {
      output.reverse();
    }

    if (reflect) {
      output = output.concat(output.slice(reverse ? 0 : 0, -1).reverse());
    }

    return output;
  }

  public size(size: number): Pyramid {
    this.options.size = size;
    return this;
  }

  public offset(offset: number): Pyramid {
    this.options.offset = offset;
    return this;
  }

  public chars(...chars: string[]): Pyramid {
    this.options.chars = chars;
    return this;
  }

  public get reverse(): Pyramid {
    this.options.reverse = true;
    return this;
  }

  public get noreverse(): Pyramid {
    this.options.reverse = false;
    return this;
  }

  public get reflect(): Pyramid {
    this.options.reflect = true;
    return this;
  }

  public get noreflect(): Pyramid {
    this.options.reflect = false;
    return this;
  }

  public spaceout(spaceout: number): Pyramid {
    this.options.spaceout = spaceout;
    return this;
  }

  public get left(): Pyramid {
    this.options.position = "left";
    return this;
  }

  public get center(): Pyramid {
    this.options.position = "center";
    return this;
  }

  public get right(): Pyramid {
    this.options.position = "right";
    return this;
  }

  public get fill(): Pyramid {
    this.options.fill = true;
    return this;
  }

  public get nofill(): Pyramid {
    this.options.fill = false;
    return this;
  }
}

// const pyramid = new Pyramid();
// pyramid.size(1).offset(2).chars("-O-");
// pyramid.draw();
// pyramid.size(8).offset(0).chars("*", "o", "@", "#", "&");
// pyramid.draw();
// pyramid.size(1).offset(2).chars("/|\\");
// pyramid.draw();

new Pyramid().spaceout(1).size(10).right.reflect.draw();
new Pyramid().spaceout(1).size(10).left.reflect.draw();
