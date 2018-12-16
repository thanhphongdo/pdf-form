import { Component, Prop, Vue } from 'vue-property-decorator'
import { BaseVue } from '../../shared/components/index'
import template from './authentication_flow.vue'
import Login from '@/components/login/login.ts'
import Register from '@/components/register/register.ts'
import { AuthenAction } from '../../interfaces/index'
import { FirstFlowStep } from '../../enums'

@Component({
  name: 'AuthenticationFlow',
  components: {
    Login,
    Register
  },
  mixins: [template]
})
export default class AuthenticationFlow extends BaseVue {
	@Prop() private step!: string;
	private currentStep!: string;

	constructor () {
	  super()
	  this.currentStep = this.step
	}

	mounted () {
	  this.currentStep = this.step
	}
	data () {
	  return {

	  }
	}

	computed () {

	}

	onLoginAction (event: AuthenAction) {
	  if (event.success == false) {
	    this.currentStep = event.step
	  } else {
	    console.log('login')
	    this.$emit('authenAction', {
	      success: true,
	      step: FirstFlowStep.SELECT_LEVEL,
	      data: {}
	    })
	  }
	}

	onRegisterAction (event: AuthenAction) {
	  console.log(event)
	  this.$emit('authenAction', {
	    success: true,
	    step: FirstFlowStep.SELECT_LEVEL,
	    data: {}
	  })
	}

	methods () {
	  return {
	    click: () => {
	      console.log(this)
	    }
	  }
	}
}
