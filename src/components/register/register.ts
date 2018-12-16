import { Component, Prop, Vue } from 'vue-property-decorator'
import { BaseVue } from '../../shared/components/index'
import template from './register.vue'
import { AuthenStep } from '../../enums'
import { register } from '../../services/parse'

@Component({
  name: 'Register',
  mixins: [template]
})
export default class Register extends BaseVue {
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
	  this.$emit('registerAction', {
	    success: false,
	    step: AuthenStep.LOGIN
	  })
	}

	register () {
	  var self = this
	  register(this.email, this.password).then(data => {
	    self.$emit('registerAction', {
	      success: true,
	      step: AuthenStep.REGISTER
	    })
	  }).catch(err => {
	    console.log(err)
	  })
	  // this.$emit('registerAction', {
	  //     success: true,
	  //     step: AuthenStep.REGISTER
	  // })
	}
}
