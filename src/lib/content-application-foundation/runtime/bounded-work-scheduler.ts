export type SchedulerStats = Readonly<{
  limit: number;
  active: number;
  peakActive: number;
  completed: number;
}>;

export class BoundedWorkScheduler {
  readonly #limit: number;
  #active = 0;
  #peakActive = 0;
  #completed = 0;

  constructor(limit = 4) {
    if (!Number.isInteger(limit) || limit < 1) {
      throw new Error("Scheduler concurrency must be a positive integer.");
    }
    this.#limit = limit;
  }

  async map<TInput, TOutput>(
    inputs: readonly TInput[],
    worker: (input: TInput, index: number) => Promise<TOutput>,
  ): Promise<readonly TOutput[]> {
    const results = new Array<TOutput>(inputs.length);
    let nextIndex = 0;

    const consume = async () => {
      while (nextIndex < inputs.length) {
        const index = nextIndex;
        nextIndex += 1;
        this.#active += 1;
        this.#peakActive = Math.max(this.#peakActive, this.#active);

        try {
          results[index] = await worker(inputs[index], index);
          this.#completed += 1;
        } finally {
          this.#active -= 1;
        }
      }
    };

    const workers = Array.from({ length: Math.min(this.#limit, inputs.length) }, consume);
    await Promise.all(workers);
    return results;
  }

  stats(): SchedulerStats {
    return Object.freeze({
      limit: this.#limit,
      active: this.#active,
      peakActive: this.#peakActive,
      completed: this.#completed,
    });
  }
}
