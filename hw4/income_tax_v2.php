<?php

const TAX_RATES = array(
    'Single' => array(
        'Rates' => array(10,   12,    22,    24,     32,     35,     37),
        'Ranges' => array(0, 9700, 39475, 84200, 160725, 204100, 510300),
        'MinTax' => array(0,  970,  4543, 14382,  32748,  46628, 153798)
    ),
    'Married_Jointly' => array(
        'Rates' => array(10, 12, 22, 24, 32, 35, 37),
        'Ranges' => array(0, 19400, 78950, 168400, 321450, 408200, 612350),
        'MinTax' => array(0, 1940, 9086, 28765, 65497, 93257, 164709)
    ),
    'Married_Separately' => array(
        'Rates' => array(10, 12, 22, 24, 32, 35, 37),
        'Ranges' => array(0, 9700, 39475, 84200, 160725, 204100, 306175),
        'MinTax' => array(0, 970, 4543, 14382.50, 32748.50, 46628.50, 82354.75)
    ),
    'Head_Household' => array(
        'Rates' => array(10, 12, 22, 24, 32, 35, 37),
        'Ranges' => array(0, 13850, 52850, 84200, 160700, 204100, 510300),
        'MinTax' => array(0, 1385, 6065, 12962, 31322, 45210, 152380)
    )
);

// Fill in the code for the following function

function incomeTax($taxableIncome, $status) {
    $incTax = 0.0;
    foreach(TAX_RATES as $key => $value){
        if($status === $key){
            $field =$value;
            $rates = $field['Rates'];
            $range = $field['Ranges'];
            $minTax = $field['MinTax'];
            $len = count($range);
            for ($i = 0; $i < $len; $i++) {
                if ($range[$i] > $taxableIncome) {
                    $j = $i - 1;
                    return $minTax[$j] + ($taxableIncome - $range[$j]) * $rates[$j]/100;
                }
            }
        }
    }
    return $incTax;
}

//print TAX_Rates
function printTaxRateTable(): void
{
    foreach (TAX_RATES as $status => $detail) {
        printSingleTable($status, $detail);
    }
}

// print Details
function printSingleTable($status, $detail): void
{
    $len = count($detail['Ranges']);
    $rates = $detail['Rates'];
    $range = $detail['Ranges'];
    $minTax = $detail['MinTax'];

    echo "<p>$status</p><br>";
    echo "<table class='table table-striped'>";
    echo "<tr> <th>Taxable Income</th> <th>Tax Rate</th></tr>";
    echo "<tr><td>$$range[0] - $$range[1]</td><td>$rates[0]% </td></tr>";
    for($i = 1 ; $i < $len-1; $i++) {
        $j = $i +1;
        $start = $range[$i]+1;
        echo "<tr><td>$$start - $$range[$j]</td><td>$$minTax[$i] plus $rates[$i]% of the amount over $$range[$i]</td></tr>";
    }
    $lastIndex = $len - 1;
    $start = $range[$lastIndex]+1;
    echo "<tr><td>$$start or more</td><td>$$minTax[$lastIndex] plus $$rates[$lastIndex]% of the amount over $$range[$lastIndex]</td></tr>";
    echo "</table>";
}


?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>HW4 Part2 - LastName</title>

  <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">

  <script src="//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>
</head>

<body>

<div class="container">

    <h3>Income Tax Calculator</h3>

    <form class="form-horizontal" method="post">

      <div class="form-group">
        <label class="control-label col-sm-2">Enter Net Income:</label>
        <div class="col-sm-10">
          <input type="number"  step="any" name="netIncome" placeholder="Taxable  Income" required autofocus>
        </div>
      </div>
      <div class="form-group"> 
        <div class="col-sm-offset-2 col-sm-10">
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
      </div>

    </form>

    <?php

        // Fill in the rest of the PHP code for form submission results

        if(isset($_POST['netIncome'])) {
            $netIncome = $_POST['netIncome'];

            echo "With a net taxable income of $$netIncome<br>";
            $status = array('Single', 'Married_Jointly', 'Married_Separately', 'Head_Household');
            echo "<table class='table table-striped'>";
            echo "<tr><th>Status</th> <th>Tax</th></tr>";

            foreach ($status as $statue){
                $tax = incomeTax($netIncome, $statue);
                echo "<tr><td>$statue</td><td>$tax</td></tr>";
            }
            echo "</table>";

        }

    ?>

    

    <h3>2019 Tax Tables</h3>
    <?php printTaxRateTable() ?>
</div>
</body>
</html>