<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Reporte Promedio Sistemas</title>
    <style>
        @page {
            margin: 1.5cm 1.2cm 1.5cm 1.2cm;
            /* top, right, bottom, left */
        }

        body {
            font-family: DejaVu Sans, sans-serif;
            font-size: 12px;
            margin: 0;
            padding: 0;
        }

        h2 {
            text-align: center;
            margin-bottom: 20px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 10px;
        }

        th,
        td {
            border: 1px solid #aaa;
            padding: 8px;
            text-align: center;
        }

        th {
            background-color: #eaeaea;
        }
    </style>
</head>

<body>
    <h2>Reporte Promedio de Respuesta por Proceso (Área de Sistemas)</h2>

    <table>
        <thead>
            <tr>
                <th>Proceso</th>
                <th>Cantidad de Tickets</th>
                <th>Promedio de Respuesta (hrs)</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($reporte as $r)
                <tr>
                    <td>{{ $r['proceso'] }}</td>
                    <td>{{ $r['cantidad'] }}</td>
                    <td>{{ $r['promedio'] }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>
