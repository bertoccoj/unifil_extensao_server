export abstract class Unit {
  private _: any;
};

class _Unit extends Unit { }

export const unit: Unit = new _Unit();
