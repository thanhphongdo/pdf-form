import { DirectiveFunction, DirectiveOptions } from 'vue'
import { Vue } from 'vue-property-decorator'
import { validateMessage } from '../enums'
import * as jQuery from 'jquery'
var $: JQueryStatic = jQuery.default

console.log(Vue.prototype)

function validate (data: string) {
  return {
    pattern: function (reg: any) {
      return reg.test(data)
    }
  }
}

function checkValidate (inputElement: any, el: any) {
  var inputName: any = $(inputElement).attr('name')
  if ($(inputElement).data('name')) {
    inputName = $(inputElement).data('name')
  }
  var validateData = validateMessage[inputName]
  function error (display: any, errorMessage?: any) {
    if (display) {
      $('#' + $(inputElement).data('error')).text(errorMessage)
      $('#' + $(inputElement).data('error')).show()
    } else {
      $('#' + $(inputElement).data('error')).hide()
    }
  }

  function checkRequired (value: any) {
    if (!value) {
      error(true, validateData.required ? validateData.required.message : '')
      return false
    } else {
      error(false)
      return true
    }
  }

  function checkValid (value: any) {
    if (!validate(value).pattern(validateData.valid ? validateData.valid.pattern : /^/)) {
      error(true, validateData.valid ? validateData.valid.message : '')
      return false
    } else {
      error(false)
      return true
    }
  }

  function checkLength (value: any) {
    var min: number = validateData.length && validateData.length.min ? validateData.length.min : 0
    var max: number = validateData.length && validateData.length.max ? validateData.length.max : 1e9
    // if(validateData.length && validateData.length.min) min = validateData.length;
    if (!value || value.length < min || value.length > max) {
      error(true, validateData.length ? validateData.length.message : '')
      return false
    } else {
      error(false)
      return true
    }
  }

  function checkEqual (value: any) {
    var fieldMatchData = null
    if (validateData.equal && validateData.equal.field) {
      fieldMatchData = $(el).find('input[name=' + validateData.equal.field + ']').val()
    }
    if (value && fieldMatchData && value != fieldMatchData) {
      error(true, validateData.equal ? validateData.equal.message : '')
      return false
    } else {
      error(false)
      return true
    }
  }

  if (inputElement) {
    if (inputElement.type == 'hidden') return true
    if ($(inputElement).data('focus') && $(inputElement).data('blur')) {
      var value = $(inputElement).val()
      if (inputElement.type == 'checkbox') {
        value = inputElement.checked
      }
      if (validateData) {
        if (validateData.required) {
          if (!checkRequired(value)) return false
        }
        if (validateData.valid) {
          if (!checkValid(value)) return false
        }
        if (validateData.length) {
          if (!checkLength(value)) return false
        }
        if (validateData.equal) {
          if (!checkEqual(value)) return false
        }
      }
      return true
    }
  }
}

export const validateDirective: DirectiveOptions = {
  bind: function (el, data) {
    var inputs = $(el).find('input')
    var form = $(el).find('form')
    inputs.focus(function () {
      console.log('focus')
      $(this).data('focus', true)
      $(this).data('blur', false)
    })
    inputs.blur(function () {
      console.log('blur')
      $(this).data('blur', true)
      checkValidate(this, el)
    })
    form.submit(function (e) {
      if (data.value.preventSubmit) e.preventDefault()
      var checkResult: any = true
      inputs.each(function () {
        $(this).data('focus', true)
        $(this).data('blur', true)
        // checkValidate(this);
        if (!$(this).data('disabled-validate')) {
          checkResult = checkValidate(this, el) && checkResult
        }
      })
      if (checkResult) {
        if (data.value.checkSuccess) {
          data.value.checkSuccess()
        }
      } else {
        if (data.value.checkError) {
          data.value.checkError()
        }
      }
      return checkResult
    })
  },
  update: function (el, data) {
    var inputs = $(el).find('input')
    inputs.each(function () {
      // if (this.type == 'checkbox') return;
      checkValidate(this, el)
    })
  }
}
