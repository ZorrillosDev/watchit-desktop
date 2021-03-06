//Basic
import React from 'react'
import Forms from './forms.js'
import FormBox from 'components/app-form'
import AppLoaderBackground from 'components/app-movie-player-loader-background/'

//Login pages class
const key = window.bridge.Key
export default class LoginForm extends React.PureComponent {

    constructor(props) {
        super(props);
        //Initial State
        this.state = {
            //Inputs lists
            success: false,
            submitted: false,
            error: false,
        };
    }

    handleRequest = (fields) => {
        //Set first state
        this.setState({
            error: false,
            submitted: true
        });

        const pb = fields.get('public')
        // Check if stored key its valid
        if (!key.isValidKey(pb)) {
            return this.setState({
                error: ['Invalid Key'],
                submitted: false
            })
        }

        // Write public key
        key.generateKey({ingest: pb});
        setTimeout(() => {
            //Set first state
            window.location.href = '#/app/movies'
        }, 2000)
    }

    render() {
        return (
            <div className="absolute valign-wrapper full-width full-height main-login-box">
                <section className="valign center-block col m6">
                    <AppLoaderBackground />
                    {/* Form Box */}
                    <section className="row input-black-box">
                        <FormBox
                            action={this.handleRequest}
                            input={Forms.login_user.inputs} // Make inputs
                            buttons={Forms.login_user.buttons} // Make buttons
                            error={this.state.error}
                            submitted={this.state.submitted}
                        />
                    </section>
                </section>
            </div>
        )
    }
}
