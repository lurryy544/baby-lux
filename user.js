(function () {
  'use strict';
  var KEY_USERS = 'babyLuxUsers';
  var KEY_SESSION = 'babyLuxUser';

  function users() { try { return JSON.parse(localStorage.getItem(KEY_USERS)) || []; } catch (e) { return []; } }
  function saveUsers(u) { try { localStorage.setItem(KEY_USERS, JSON.stringify(u)); } catch (e) {} }
  function session() { try { return JSON.parse(sessionStorage.getItem(KEY_SESSION)) || null; } catch (e) { return null; } }
  function setSession(u) {
    try {
      if (u) sessionStorage.setItem(KEY_SESSION, JSON.stringify(u));
      else sessionStorage.removeItem(KEY_SESSION);
    } catch (e) {}
  }
  function findUser(login) {
    var all = users();
    var q = String(login).toLowerCase();
    for (var i = 0; i < all.length; i++) if (String(all[i].login).toLowerCase() === q) return all[i];
    return null;
  }
  function register(data) {
    var all = users();
    if (findUser(data.login)) return { ok: false, msg: 'Такой логин (телефон/email) уже зарегистрирован' };
    var rec = { name: data.name || '', login: data.login, pass: data.pass, phone: data.phone || '', created: Date.now() };
    all.push(rec); saveUsers(all); setSession(rec);
    return { ok: true, user: rec };
  }
  function login(login, pass) {
    var x = findUser(login);
    if (!x) return { ok: false, msg: 'Пользователь с таким логином не найден' };
    if (x.pass !== pass) return { ok: false, msg: 'Неверный пароль' };
    setSession(x);
    return { ok: true, user: x };
  }
  function logout() { setSession(null); }

  var style = document.createElement('style');
  style.textContent =
    '.user-btn__avatar{width:22px;height:22px;border-radius:50%;background:var(--primary-d,#1FA5C4);color:#fff;font-weight:800;font-size:13px;display:grid;place-items:center}' +
    '.icon-btn.is-user{border-color:var(--primary,#2EC8E6);background:#fff}';
  document.head.appendChild(style);

  var btn = document.getElementById('userBtn');
  if (btn) {
    var s = session();
    if (s) {
      btn.classList.add('is-user');
      btn.setAttribute('aria-label', 'Личный кабинет — ' + (s.name || s.login));
      btn.innerHTML = '';
      var av = document.createElement('span');
      av.className = 'user-btn__avatar';
      av.textContent = (s.name || s.login || '?').trim().charAt(0).toUpperCase();
      btn.appendChild(av);
    }
  }

  window.BabyUser = { users: users, session: session, login: login, register: register, logout: logout };
})();