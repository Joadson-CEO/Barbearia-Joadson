document.addEventListener("DOMContentLoaded", () => {
    const appointmentForm = document.getElementById("appointmentForm");
    const appointmentsList = document.getElementById("appointmentsList");
    let editingIndex = null;  // Variável para armazenar o índice do agendamento que está sendo editado
    
    // Carregar agendamentos salvos no LocalStorage
    const loadAppointments = () => {
        const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
        appointmentsList.innerHTML = ""; // Limpa a lista antes de recriar
        appointments.forEach((appointment, index) => {
            const li = document.createElement("li");
            li.className = "list-group-item d-flex justify-content-between align-items-center";
            li.innerHTML = `
                <div>
                    <strong>${appointment.name}</strong> - 
                    ${appointment.date} às ${appointment.time}
                </div>
                <div>
                    <button class="btn btn-warning btn-sm me-2" onclick="editAppointment(${index})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteAppointment(${index})">Excluir</button>
                </div>
            `;
            appointmentsList.appendChild(li);
        });
    };

    // Adicionar ou atualizar agendamento
    const saveAppointment = (e) => {
        e.preventDefault();  // Impede o comportamento padrão do formulário (recarregar a página)
        const name = document.getElementById("name").value;
        const date = document.getElementById("date").value;
        const time = document.getElementById("time").value;

        const appointments = JSON.parse(localStorage.getItem("appointments")) || [];

        if (editingIndex === null) {
            // Se não estiver editando, adiciona um novo agendamento
            appointments.push({ name, date, time });
        } else {
            // Se estiver editando, substitui o agendamento existente
            appointments[editingIndex] = { name, date, time };
            editingIndex = null;  // Reseta o índice após a edição
        }

        localStorage.setItem("appointments", JSON.stringify(appointments));
        loadAppointments();  // Atualiza a lista de agendamentos
        appointmentForm.reset();  // Limpa o formulário
    };

    // Editar agendamento
    window.editAppointment = (index) => {
        const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
        const appointment = appointments[index];
        document.getElementById("name").value = appointment.name;
        document.getElementById("date").value = appointment.date;
        document.getElementById("time").value = appointment.time;
        editingIndex = index;  // Armazena o índice do agendamento que está sendo editado
    };

    // Excluir agendamento
    window.deleteAppointment = (index) => {
        const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
        appointments.splice(index, 1);  // Remove o agendamento
        localStorage.setItem("appointments", JSON.stringify(appointments));
        loadAppointments();
    };

    // Inicializar
    appointmentForm.addEventListener("submit", saveAppointment);
    loadAppointments();
});
