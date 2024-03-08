import { environment } from 'src/environments/environment';

export namespace Url {
  export function producer(path?: string): string {
    return environment.producerBaseUrl + path;
  }

  export function consumer(path?: string): string {
    return environment.consumerBaseUrl + path;
  }

  export function socket(path?: string): string {
    if (path === undefined) {
      return environment.socketUrl;
    }

    return environment.socketUrl + path ?? '';
  }
}
