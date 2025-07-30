<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *"); // Permite requisições de qualquer origem (AJUSTAR PARA PRODUÇÃO!)
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Lidar com requisições OPTIONS (preflight requests do CORS)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Configurações da Base de Dados (SUBSTITUA PELOS SEUS DADOS DA HOSTGATOR)
$servername = "localhost"; // Geralmente localhost na HostGator
$username = "everis50_Database_lookdehoje"; // Substitua pelo seu utilizador MySQL
$password = "LooksdeHoje@2025"; // Substitua pela sua palavra-passe MySQL
$dbname = "everis50_Database_lookdehoje"; // Substitua pelo nome da sua base de dados

// Conexão com a Base de Dados
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar a conexão
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Erro de conexão com a base de dados: " . $conn->connect_error]);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

switch ($method) {
    case 'GET':
        // LER PRODUTOS
        $sql = "SELECT id, titulo, descricao, imagem_url, whatsapp_message FROM produtos";
        $result = $conn->query($sql);

        $products = [];
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $products[$row['id']] = $row;
            }
        }
        echo json_encode(["success" => true, "data" => $products]);
        break;

    case 'POST':
        // ADICIONAR PRODUTO
        $id = $input['id'] ?? '';
        $titulo = $input['title'] ?? '';
        $descricao = $input['description'] ?? '';
        $imagem_url = $input['image'] ?? '';
        $whatsapp_message = $input['whatsappMessage'] ?? '';

        if (empty($id) || empty($titulo) || empty($descricao) || empty($imagem_url) || empty($whatsapp_message)) {
            echo json_encode(["success" => false, "message" => "Todos os campos são obrigatórios."]);
            break;
        }

        $stmt = $conn->prepare("INSERT INTO produtos (id, titulo, descricao, imagem_url, whatsapp_message) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("sssss", $id, $titulo, $descricao, $imagem_url, $whatsapp_message);

        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Produto adicionado com sucesso."]);
        } else {
            echo json_encode(["success" => false, "message" => "Erro ao adicionar produto: " . $stmt->error]);
        }
        $stmt->close();
        break;

    case 'PUT':
        // ATUALIZAR PRODUTO (requer o ID na URL ou no corpo da requisição)
        $id = $input['id'] ?? '';
        $titulo = $input['title'] ?? '';
        $descricao = $input['description'] ?? '';
        $imagem_url = $input['image'] ?? '';
        $whatsapp_message = $input['whatsappMessage'] ?? '';

        if (empty($id) || empty($titulo) || empty($descricao) || empty($imagem_url) || empty($whatsapp_message)) {
            echo json_encode(["success" => false, "message" => "Todos os campos são obrigatórios para a atualização."]);
            break;
        }

        $stmt = $conn->prepare("UPDATE produtos SET titulo=?, descricao=?, imagem_url=?, whatsapp_message=? WHERE id=?");
        $stmt->bind_param("sssss", $titulo, $descricao, $imagem_url, $whatsapp_message, $id);

        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Produto atualizado com sucesso."]);
        } else {
            echo json_encode(["success" => false, "message" => "Erro ao atualizar produto: " . $stmt->error]);
        }
        $stmt->close();
        break;

    case 'DELETE':
        // REMOVER PRODUTO (requer o ID na URL ou no corpo da requisição)
        $id = $_GET['id'] ?? $input['id'] ?? '';

        if (empty($id)) {
            echo json_encode(["success" => false, "message" => "ID do produto é obrigatório para a remoção."]);
            break;
        }

        $stmt = $conn->prepare("DELETE FROM produtos WHERE id=?");
        $stmt->bind_param("s", $id);

        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Produto removido com sucesso."]);
        } else {
            echo json_encode(["success" => false, "message" => "Erro ao remover produto: " . $stmt->error]);
        }
        $stmt->close();
        break;

    default:
        echo json_encode(["success" => false, "message" => "Método de requisição não suportado."]);
        break;
}

$conn->close();
?>
