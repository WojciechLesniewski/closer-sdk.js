// tslint:disable:no-namespace
// tslint:disable:max-classes-per-file
// tslint:disable:ban-types
import { DomainEvent } from './domain-event';

export namespace serverEvents {
  // tslint:disable-next-line:no-empty-interface
  export interface ServerEvent extends DomainEvent {

  }

  export class Hello implements ServerEvent {
    public static readonly tag: string = 'hello';
    public readonly __discriminator__ = 'domainEvent';
    public readonly deviceId: string;
    public readonly timestamp: number;
    public readonly heartbeatTimeout: number;
    public readonly tag = Hello.tag;

    constructor(deviceId: string, timestamp: number, heartbeatTimeout: number) {
      this.deviceId = deviceId;
      this.timestamp = timestamp;
      this.heartbeatTimeout = heartbeatTimeout;
    }

    public static is(e: DomainEvent): e is Hello {
      return e.tag === Hello.tag;
    }
  }

  export class OutputHeartbeat implements ServerEvent {
    public static readonly tag: string = 'output_heartbeat';
    public readonly __discriminator__ = 'domainEvent';
    public readonly tag = OutputHeartbeat.tag;
    public readonly timestamp: number;

    constructor(timestamp: number) {
      this.timestamp = timestamp;
    }

    public static is(e: DomainEvent): e is OutputHeartbeat {
      return e.tag === OutputHeartbeat.tag;
    }
  }
}
