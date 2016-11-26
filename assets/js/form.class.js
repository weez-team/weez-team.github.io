// Generated by CoffeeScript 1.10.0
var Form,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Form = (function() {
  function Form(args) {
    this.selector = bind(this.selector, this);
    this.isInList = bind(this.isInList, this);
    this.fail = bind(this.fail, this);
    this.opts = {
      reset: true,
      list: [],
      before: (function(_this) {
        return function(e) {};
      })(this),
      after: (function(_this) {
        return function(e) {};
      })(this),
      success: (function(_this) {
        return function(e) {
          _this.success(e.answer);
        };
      })(this),
      fail: (function(_this) {
        return function(e) {
          _this.fail(e.answer);
        };
      })(this)
    };
    if (typeof args !== 'undefined') {
      if (typeof args.reset !== 'undefined') {
        this.opts.reset = args.reset;
      }
      if (typeof args.list !== 'undefined') {
        this.opts.list = args.list;
      }
      if (typeof args.before === 'function') {
        this.opts.before = args.before;
      }
      if (typeof args.after === 'function') {
        this.opts.after = args.after;
      }
      if (typeof args.success === 'function') {
        this.opts.success = args.success;
      }
      if (typeof args.fail === 'function') {
        this.opts.fail = args.fail;
      }
    }
    this.setEvents();
    return;
  }

  Form.prototype.setEvents = function() {
    $(document).on('change', (function(_this) {
      return function(e) {
        var form, me;
        me = $(e.target);
        if (me.is('input[type="file"]')) {
          form = me.closest('form');
          if (_this.isInList(form)) {
            files[_this.selector(me.closest('form'))] = e.target.files;
          }
        }
      };
    })(this));
    $(document).on('submit', (function(_this) {
      return function(e) {
        var data, dataFiles, form;
        form = $(e.target);
        if (_this.isInList(form)) {
          e.preventDefault();
          data = form.serialize();
          if ((form.find('input[type="file"]').length) && (typeof files[_this.selector(form)] !== 'undefined') && files[_this.selector(form)].length) {
            dataFiles = new FormData();
            $.each(files[_this.selector(form)], function(key, value) {
              dataFiles.append(key, value);
            });
            _this.submit({
              type: 'files',
              form: form,
              data: dataFiles
            });
          } else {
            _this.submit({
              form: form,
              data: data
            });
          }
        }
      };
    })(this));
  };

  Form.prototype.success = function(data) {
    console.log('ajax success:');
    console.log(data);
  };

  Form.prototype.fail = function(data) {
    console.log(data);
  };

  Form.prototype.isInList = function(form) {
    var formFromList, j, len, ref;
    ref = this.opts.list;
    for (j = 0, len = ref.length; j < len; j++) {
      formFromList = ref[j];
      if (form.is(formFromList)) {
        return true;
      }
    }
    return false;
  };

  Form.prototype.selector = function(form) {
    var i, j, ref;
    for (i = j = 0, ref = this.opts.list.length - 1; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
      if (form.is(this.opts.list[i])) {
        return this.opts.list[i];
      }
    }
  };

  Form.prototype.submit = function(o) {
    var data, form, query, result, url;
    if (typeof o.form === 'undefined') {
      return false;
    }
    if (typeof o.data === 'undefined') {
      return false;
    }
    form = o.form;
    data = o.data;
    if (typeof this.opts.before === 'function') {
      result = this.opts.before({
        form: form,
        data: data,
        answer: void 0
      });
      if (typeof result !== 'undefined') {
        if (typeof result.data !== 'undefined') {
          data = result.data;
        }
        if (typeof result.stop !== 'undefined') {
          return false;
        }
      }
    }
    switch (o.type) {
      case 'files':
        url = form.attr('action') + '?form=' + encodeURIComponent(this.selector(form));
        query = form.serialize();
        if (query.length) {
          url += '&' + query;
        }
        $.ajax({
          type: form.attr('method'),
          url: url,
          data: data,
          cache: false,
          dataType: 'json',
          processData: false,
          contentType: false,
          headers: {
            'Access-Control-Allow-Origin': 'https://weez-team.github.io'
          }
        }).done((function(_this) {
          return function(answer) {
            if (typeof answer.success !== 'undefined') {
              if (_this.opts.reset) {
                form.trigger('reset');
              }
              if (typeof _this.opts.success === 'function') {
                return _this.opts.success({
                  form: form,
                  data: data,
                  answer: answer
                });
              }
            } else if (typeof answer.fail !== 'undefined') {
              console.warn('Form.fail: answer.fail');
              if (typeof _this.opts.fail === 'function') {
                return _this.opts.fail({
                  form: form,
                  data: data,
                  answer: answer
                });
              }
            } else {
              console.warn('Form.fail: answer unexpected');
              if (typeof _this.opts.fail === 'function') {
                return _this.opts.fail({
                  form: form,
                  data: data,
                  answer: answer
                });
              }
            }
          };
        })(this)).always((function(_this) {
          return function(answer) {
            if (typeof _this.opts.after === 'function') {
              return _this.opts.after({
                form: form,
                data: data,
                answer: answer
              });
            }
          };
        })(this)).fail((function(_this) {
          return function(error) {
            console.warn('Form.fail: ajax fail');
            if (typeof _this.opts.fail === 'function') {
              return _this.opts.fail({
                form: form,
                data: data,
                answer: error
              });
            }
          };
        })(this));
        break;
      default:
        $.ajax({
          type: form.attr('method'),
          url: form.attr('action'),
          data: data,
          cache: false,
          headers: {
            'Access-Control-Allow-Origin': 'https://weez-team.github.io'
          }
        }).done((function(_this) {
          return function(response) {
            var answer, error, error1;
            try {
              answer = JSON.parse(response);
              if (typeof answer.success !== 'undefined') {
                if (_this.opts.reset) {
                  form.trigger('reset');
                }
                if (typeof _this.opts.success === 'function') {
                  return _this.opts.success({
                    form: form,
                    data: data,
                    answer: answer
                  });
                }
              } else if (typeof answer.fail !== 'undefined') {
                console.warn('Form.fail: answer.fail');
                if (typeof _this.opts.fail === 'function') {
                  return _this.opts.fail({
                    form: form,
                    data: data,
                    answer: answer
                  });
                }
              } else {
                console.warn('Form.fail: answer unexpected');
                if (typeof _this.opts.fail === 'function') {
                  return _this.opts.fail({
                    form: form,
                    data: data,
                    answer: answer
                  });
                }
              }
            } catch (error1) {
              error = error1;
              console.warn('Form.fail: JSON.parse() fail');
              return console.log({
                response: response,
                error: error
              });
            }
          };
        })(this)).always((function(_this) {
          return function(answer) {
            if (typeof _this.opts.after === 'function') {
              return _this.opts.after({
                form: form,
                data: data,
                answer: answer
              });
            }
          };
        })(this)).fail((function(_this) {
          return function(error) {
            console.warn('Form.fail: ajax fail');
            if (typeof _this.opts.fail === 'function') {
              return _this.opts.fail({
                form: form,
                data: data,
                answer: error
              });
            }
          };
        })(this));
        break;
    }
  };

  return Form;

})();
