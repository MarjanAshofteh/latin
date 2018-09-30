export const cookie = {
  methods:{
    getCookie(name) {
      var nameEQ = name + "="
      var ca = document.cookie.split(';')
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i]
        //console.log(c)
        while (c.charAt(0) == ' ') c = c.substring(1, c.length)
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length)
      }
      return null
    },
    setCookie(name, value, days){
      var cookie = name + "=" + value + ";"
      if (days) { 
        var expires = new Date()
        expires = new Date(expires.getFullYear(),expires.getMonth(),expires.getDate()+days)
        cookie += "expires=" + expires + ";"
      }
      document.cookie = cookie + expires + "; path=/"
    },
    eraseCookie(name) {this.setCookie(name, "", -1);},
    getUserCookie(name){
      var obj = JSON.parse(this.getCookie("user_cookie"))
      if (name){
          return obj[name]
      }
      return null
    },
    setUid(uid){
      this.$store.commit('LOGIN',uid);
    }
  }
}