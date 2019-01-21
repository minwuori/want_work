document.addEventListener('DOMContentLoaded', function(){
    'use strict';

    /* инпуты */
    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    var InputNew = function () {
        function InputNew(options) {
            _classCallCheck(this, InputNew);

            this._element = options.element;
            this._label = this._element.querySelector('.input-new__label');
            this._input = this._element.querySelector('.input-new__input');

            if (this._input.value) {
                this._label.classList.add('input-new__label_active');
            }

            var onElementClick = this.onElementClick.bind(this);
            var onInputBlur = this.onInputBlur.bind(this);

            this._element.addEventListener('focus', onElementClick, true);
            this._element.addEventListener('blur', onInputBlur, true);
        }

        _createClass(InputNew, [{
            key: 'onElementClick',
            value: function onElementClick(event) {
                this._input.focus();
                this._label.classList.add('input-new__label_active');
            }
        }, {
            key: 'onInputBlur',
            value: function onInputBlur() {
                if (!this._input.value) {
                    this._label.classList.remove('input-new__label_active');
                }
            }
        }]);

        return InputNew;
    }();
    /* /инпуты */

    /* настройки валидатора */
    $.validator.addMethod("PhoneRU", function(value, element) {
        return this.optional( element ) || /^( +)?((\+?7|8) ?)?((\(\d{3}\))|(\d{3}))?( )?(\d{3}[\- ]?\d{2}[\- ]?\d{2})( +)?$/.test(value);
    }, 'Введите корректный номер телефона');

    $.validator.addMethod("NameRu", function(value, element) {
        return this.optional( element ) || /^[А-ЯёЁа-я]+$/.test(value);
    }, 'Напишите настоящее имя.');

    $.validator.addMethod("SureNameRu", function(value, element) {
        return this.optional( element ) || /^[А-ЯёЁа-я\-]+$/.test(value);
    }, 'Напишите настоящую фамилию');

    $.validator.addMethod('Registration', function (value, element) {
        return this.optional(element) || /^[а-яА-ЯёЁ0-9\s\/\-.,]*$/.test(value);
    }, 'Напишите настоящий адрес');

    $.validator.addMethod('strongMail', function (value, element) {
        return this.optional(element) || /^.+@.+[.].{2,}$/i.test(value);
    }, 'Введите корректный email адрес');

    $.validator.addMethod('birthDate', function (value, element) {
        return this.optional(element) || /^[0-3]{1}[0-9]{1}\.[0-1]{1}[0-9]{1}\.[0-2]{1}[0-9]{1}[0-9]{1}[0-9]{1}/.test(value);
    }, 'Введите корректную дату рождения');

    $.validator.addMethod('BlankCheck', function (value, element) {
        return this.optional(element) || element.is(":checked");
    }, 'Это поле обязательно для заполнения');

    $.validator.setDefaults({
        errorClass: 'input__error color_red fs_2 mb-20',
        errorElement: "div",
        errorPlacement: function(error, element) {
            error.appendTo(element.parent());
        }
    });
    /* /настройки валидатора */

    /* валидация формы */
    var formValidate = function() {
        $('#want-work-anketa').validate({
            rules: {
                surname: {
                    minlength: '2',
                    SureNameRu: true
                },

                name: {
                    minlength: '2',
                    NameRu: true
                },

                phone: {
                    minlength: '6'
                },

                registration: {
                    Registration: true
                },
                email: {
                    strongMail: true
                }
            },

            messages: {
                surname: {
                    required: 'Это поле должно быть заполнено',
                    minlength: 'Не менее 2-x символов'
                },
                name: {
                    required: 'Это поле должно быть заполнено',
                    minlength: 'Не менее 2-x символов'
                },

                registration: {
                    required: 'Это поле должно быть заполнено',
                    minlength: 'Не менее 6-ти символов'
                },

                phone: {
                    required: 'Это поле должно быть заполнено',
                    minlength: 'Не менее 6-ти символов'
                },

                email: {
                    required: 'Это поле должно быть заполнено'
                }
            },

        });

        var message = document.getElementsByClassName('message_margin');
        var messError = document.getElementsByClassName('input__error');
        if (messError) {
            message[0].style.marginBottom = '5px';
        }
    }();
    /* /валидация формы*/

    var inputs = Array.prototype.slice.call(document.querySelectorAll('.input-new'));
    inputs.forEach(function (item) {
        new InputNew({
            element: item
        });
    });


    document.addEventListener('keydown', function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
        }
    });

});

