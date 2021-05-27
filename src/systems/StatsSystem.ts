import Stats from "stats.js";
import { System } from "../ecs";
import Event from '../event';

interface StatsSystem extends System {
  stats: Stats;
}

export const StatsSystem: StatsSystem = {
  type: "StatsSystem",
  entities: [],
  stats: new Stats(),

  init: function () {
    this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(this.stats.dom);
    
    Event.fire("stats.loaded"); // doSomething() is called
  },

  onFrameStart: function () {
    this.stats.begin();
  },

  onFrameEnd: function () {
    this.stats.end();
  },
};
