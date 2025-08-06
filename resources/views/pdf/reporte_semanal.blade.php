<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Reporte Tickets por Área</title>
    <style>
        @page {
            margin: 1.5cm 1.2cm 1.5cm 1.2cm;
            /* top, right, bottom, left */
        }

        body {
            font-family: DejaVu Sans, sans-serif;
            margin: 0;
            padding: 0;
        }


        h2 {
            text-align: center;
            margin-bottom: 30px;
        }

        .departamento {
            background-color: #f3f3f3;
            padding: 10px;
            font-weight: bold;
            text-align: center;
            margin-top: 20px;
            border-radius: 6px 6px 0 0;
            border: 1px solid #ccc;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 25px;
        }

        th,
        td {
            border: 1px solid #ccc;
            padding: 8px 5px;
            text-align: center;
            font-size: 12px;
        }

        th {
            font-weight: bold;
        }

        .amarillo {
            color: #b58900;
        }

        .verde {
            color: #2e7d32;
        }

        .naranja {
            color: #ef6c00;
        }

        .rojo {
            color: #c62828;
        }
    </style>
</head>

<body>
    <h2>Reporte Semanal atención de Tickets por Área</h2>

    @foreach ($reporte as $area)
        <div class="departamento">{{ $area['area'] }} ({{ $area['total'] }} tickets)</div>
        <table>
            <thead>
                <tr>
                    <th class="amarillo">Sin respuesta en tiempo</th>
                    <th class="verde">Se dio respuesta en tiempo</th>
                    <th class="naranja">Sin respuesta fuera de tiempo</th>
                    <th class="rojo">Se dio respuesta fuera de tiempo</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ $area['sin_respuesta_tiempo'] }}</td>
                    <td>{{ $area['respondido_tiempo'] }}</td>
                    <td>{{ $area['sin_respuesta_fuera_tiempo'] }}</td>
                    <td>{{ $area['respondido_fuera_tiempo'] }}</td>
                </tr>
            </tbody>
        </table>
    @endforeach
</body>

</html>
