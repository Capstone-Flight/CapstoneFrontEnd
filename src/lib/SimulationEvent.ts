export type GraphEventHandler<T> = (event: T) => void;

export class SimulationEvent<T> {
    private handlers: GraphEventHandler<T>[] = [];

    public addHandler(handler: GraphEventHandler<T>): void {
        this.handlers.push(handler);
    }

    public removeHandler(handler: GraphEventHandler<T>) : void {
        const index = this.handlers.indexOf(handler);

        if (index > -1) {
            this.handlers.splice(index, 1);
        }
    }

    public trigger(event: T): void {
        this.handlers.forEach(handler => handler(event));
    }
}