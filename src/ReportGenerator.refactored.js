export class ReportGenerator {
    constructor(database) {
        this.db = database;
    }

    /**
     * Gera um relatório de itens baseado no tipo e no usuário.
     * - Admins veem tudo.
     * - Users comuns só veem itens com valor <= 500.
     */
    generateUserReportHTML(report, total, user, items) {
        // --- Seção do Cabeçalho ---
        report += '<html><body>\n';
        report += '<h1>Relatório</h1>\n';
        report += `<h2>Usuário: ${user.name}</h2>\n`;
        report += '<table>\n';
        report += '<tr><th>ID</th><th>Nome</th><th>Valor</th></tr>\n';
        // --- Seção do Corpo (Alta Complexidade) ---
        for (const item of items) {

            if (item.value <= 500) {
                // Users comuns só veem itens de valor baixo
                report += `<tr><td>${item.id}</td><td>${item.name}</td><td>${item.value}</td></tr>\n`;
                total += item.value;
            }
        }
        // --- Seção do Rodapé ---
        report += '</table>\n';
        report += `<h3>Total: ${total}</h3>\n`;
        report += '</body></html>\n';

        return report.trim();
    }
    generateAdminReportHTML(report, total, user, items) {
        // --- Seção do Cabeçalho ---
        report += '<html><body>\n';
        report += '<h1>Relatório</h1>\n';
        report += `<h2>Usuário: ${user.name}</h2>\n`;
        report += '<table>\n';
        report += '<tr><th>ID</th><th>Nome</th><th>Valor</th></tr>\n';
        // --- Seção do Corpo (Alta Complexidade) ---
        for (const item of items) {
            // Admins veem todos os itens
            if (item.value > 1000) {
                // Lógica bônus para admins
                item.priority = true;
            }
            const style = item.priority ? 'style="font-weight:bold;"' : '';
            report += `<tr ${style}><td>${item.id}</td><td>${item.name}</td><td>${item.value}</td></tr>\n`;
            total += item.value;
        }
        // --- Seção do Rodapé ---
        report += '</table>\n';
        report += `<h3>Total: ${total}</h3>\n`;
        report += '</body></html>\n';

        return report.trim();
    }

    generateUserReportCSV(report, total, user, items) {
        // --- Seção do Cabeçalho ---
        report += 'ID,NOME,VALOR,USUARIO\n';
        // --- Seção do Corpo (Alta Complexidade) ---
        for (const item of items) {
            if (item.value <= 500) {
                // Users comuns só veem itens de valor baixo
                report += `${item.id},${item.name},${item.value},${user.name}\n`;
                total += item.value;
            }
        }
        // --- Seção do Rodapé ---
        report += '\nTotal,,\n';
        report += `${total},,\n`;
        return report.trim();
    }
    generateAdminReportCSV(report, total, user, items) {
        // --- Seção do Cabeçalho ---
        report += 'ID,NOME,VALOR,USUARIO\n';
        // --- Seção do Corpo (Alta Complexidade) ---
        for (const item of items) {
            // Admins veem todos os itens
            if (item.value > 1000) {
                // Lógica bônus para admins
                item.priority = true;
            }
            report += `${item.id},${item.name},${item.value},${user.name}\n`;
            total += item.value;
        }
        // --- Seção do Rodapé ---
        report += '\nTotal,,\n';
        report += `${total},,\n`;
        return report.trim();
    }
    generateReport(reportType, user, items) {
        let report = '';
        let total = 0;
        const isCSV = reportType === 'CSV';
        const isAdmin = user.role === 'ADMIN';

        if (isAdmin) {
            if (isCSV) {
                this.generateAdminReportCSV(report, total, user, items);
            }
            this.generateAdminReportHTML(report, total, user, items);

        }

        // User comum
        if (isCSV) {
            this.generateUserReportCSV(report, total, user, items);
        }
        this.generateUserReportHTML(report, total, user, items);

    }
}
