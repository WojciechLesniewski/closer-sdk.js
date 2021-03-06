import { Session } from '@closerplatform/closer-sdk';
import { SpinnerClient, LeadCtx, SignUpGuest } from '@swagger/spinner';
import { SessionService } from '../session.service';
import { Credentials } from '../credentials';

export interface NewConnnect {
  session: Session;
  leadCtx: LeadCtx;
}

export interface ExistingConnect {
  session: Session;
  roomId: string;
}

export class GuestService {
  public session: Session;
  public spinnerClient: SpinnerClient;
  private sessionService: SessionService;

  constructor (sc: SpinnerClient) {
    this.sessionService = new SessionService();
    this.spinnerClient = sc;
  }

  public getExistingGuestSession = async (credentials: Credentials): Promise<ExistingConnect> => {
    this.spinnerClient.apiKey = credentials.apiKey;
    const guestProfile = await this.spinnerClient.getGuestProfile(credentials.orgId, credentials.id);

    const authCtx = {
      id: credentials.id,
      apiKey: credentials.apiKey
    };

    this.session = this.sessionService.connect(authCtx, credentials);

    return { session: this.session, roomId: guestProfile.roomId};
  }

  public getNewGuestSession = async (orgId: string, credentials: Credentials): Promise<NewConnnect> => {
    const signUpArgs: SignUpGuest.Args = { orgId };
    const body: SignUpGuest = new SignUpGuest(signUpArgs);

    const leadCtx = await this.spinnerClient.signUpGuest(body);
    const session = this.sessionService.connect(leadCtx, credentials);

    this.spinnerClient.apiKey = leadCtx.apiKey;
    this.session = session;

    return {leadCtx, session};
  }
}
