import { Component, Prop, Vue } from 'vue-property-decorator'
import { BaseVue } from '../../shared/components/index'
import template from './login.vue'
import { AuthenStep } from '../../enums'
import { login } from '../../services/parse'

@Component({
  name: 'Login',
  mixins: [template]
})
export default class Login extends BaseVue {
	@Prop() private msg!: string;

	email!: string;
	password!: string;

	data () {
	  return {
	    email: '',
	    password: ''
	  }
	}

	login () {
	  login(this.email, this.password).then(data => {
	    this.$emit('loginAction', {
	      success: true,
	      step: AuthenStep.LOGIN
	    })
	  }).catch(err => {
	    console.log(err)
	  })
	}

	register () {
	  this.$emit('loginAction', {
	    success: false,
	    step: AuthenStep.REGISTER
	  })
	}
}
