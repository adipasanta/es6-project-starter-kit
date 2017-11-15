import { select, selectAll, event } from "d3-selection";
import { format } from "d3-format";
import { min, max, extent, sum } from "d3-array";

/**
 * An awesome script - edit
 */
export default class {
  constructor(name = 'Dear Coder', text = 'hi there') {
    this.name = name
    this.text = text
  }
  get message() {
    return `${this.text} ${this.name}!`
  }
  set message(text) {
    this.text = helpers.trim(text)
  }
}