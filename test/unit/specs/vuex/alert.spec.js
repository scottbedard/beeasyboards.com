import { mutations } from 'src/app/store/modules/alert';

describe('vuex - alert.js', () => {
    it('ALERT_PUSH', () => {
        let state = { alerts: [] };
        mutations.ALERT_PUSH(state, 'hello world');

        expect(state.alerts[0]).to.equal('hello world');
    });

    it('ALERT_REMOVE', () => {
        let alert = { foo: 'bar' };
        let state = { alerts: [alert] };
        mutations.ALERT_REMOVE(state, alert);

        expect(state.alerts.length).to.equal(0);
    });
});
