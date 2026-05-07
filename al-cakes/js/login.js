$(document).ready(function(){
    document.getElementById('btn_login').addEventListener('click', async function() {
    try {
        const resultado = await auth();
        console.log('Login OK:', resultado);
        window.location.href = '../index.html';
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro no login: ' + error.message);
    }
    });

    

})

async function auth(){

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    const resultado = await apiCall('/auth/login', 'POST', { email: email, senha: senha });
    localStorage.setItem('token', resultado.token);

  return resultado;
}


