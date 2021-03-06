import { SpinnerApi } from './spinner-api';
import { SessionData, AgentContext } from '../protocol/protocol';

export class Spinner {
    constructor(
        private spinnerApi: SpinnerApi,
    ) {
    }

    public async verifySignature(sessionData: SessionData): Promise<AgentContext> {
        return this.spinnerApi.verifySignature(sessionData);
    }
}
