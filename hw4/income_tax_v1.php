<?php

// Fill in the code for the following four functions


function incomeTaxSingle($taxableIncome) {
    $incTax = 0.0;

    if( $taxableIncome <= 9700){
        $incTax = $taxableIncome * 0.1;
    }elseif ($taxableIncome <= 39475){
        $incTax = ($taxableIncome - 9700) * 0.12 + 970;
    }elseif ($taxableIncome <= 84200){
        $incTax =($taxableIncome - 39475) * 0.22 + 4543;
    }elseif($taxableIncome <= 160725){
        $incTax = ($taxableIncome - 84200) * 0.24 + 14382;
    }elseif($taxableIncome <= 204100){
        $incTax = ($taxableIncome - 160725) * 0.32 + 32748;
    }elseif ($taxableIncome <= 510300){
        $incTax = ($taxableIncome - 204100) * 0.35 + 46628;
    }else{
        $incTax = ($taxableIncome - 510300) * 0.37 + 153798;
    }
    
    return $incTax;

}

function incomeTaxMarriedJointly($taxableIncome) {
    $incTax = 0.0;

    if( $taxableIncome <= 19400){
        $incTax = $taxableIncome * 0.1;
    }elseif ($taxableIncome <= 78950){
        $incTax = ($taxableIncome - 19400) * 0.12 + 1940;
    }elseif ($taxableIncome <= 168400){
        $incTax =($taxableIncome - 78950) * 0.22 + 9086;
    }elseif($taxableIncome <= 321450){
        $incTax = ($taxableIncome - 168400) * 0.32 + 28765;
    }elseif($taxableIncome <= 408200){
        $incTax = ($taxableIncome - 321450) * 0.35 + 65497;
    }elseif ($taxableIncome <= 612350){
        $incTax = ($taxableIncome - 408200) * 0.35 + 93257;
    }else{
        $incTax = ($taxableIncome - 612350) * 0.37 + 164709;
    }
    return $incTax;

}

function incomeTaxMarriedSeparately($taxableIncome) {
    $incTax = 0.0;
    if( $taxableIncome <= 9700){
        $incTax = $taxableIncome * 0.1;
    }elseif ($taxableIncome <= 39475){
        $incTax = ($taxableIncome - 9700) * 0.12 + 970;
    }elseif ($taxableIncome <= 84200){
        $incTax =($taxableIncome - 39475) * 0.22 + 4543;
    }elseif($taxableIncome <= 160725){
        $incTax = ($taxableIncome - 84200) * 0.24 + 14382.50;
    }elseif($taxableIncome <= 204100){
        $incTax = ($taxableIncome - 160725) * 0.32 + 32748.50;
    }elseif ($taxableIncome <= 306175){
        $incTax = ($taxableIncome - 204100) * 0.35 + 46628.50;
    }else{
        $incTax = ($taxableIncome - 306175) * 0.37 + 82354.75;
    }

    return $incTax;


}

function incomeTaxHeadOfHousehold($taxableIncome) {
    $incTax = 0.0;
    if( $taxableIncome <= 13850){
        $incTax = $taxableIncome * 0.1;
    }elseif ($taxableIncome <= 52850){
        $incTax = ($taxableIncome - 9700) * 0.12 + 1385;
    }elseif ($taxableIncome <= 84200){
        $incTax =($taxableIncome - 39475) * 0.22 + 6065;
    }elseif($taxableIncome <= 160700){
        $incTax = ($taxableIncome - 84200) * 0.24 + 12962;
    }elseif($taxableIncome <= 204100){
        $incTax = ($taxableIncome - 160725) * 0.32 + 31322;
    }elseif ($taxableIncome <= 510300){
        $incTax = ($taxableIncome - 204100) * 0.35 + 45210;
    }else{
        $incTax = ($taxableIncome - 510300) * 0.37 + 152380;
    }

    return $incTax;


}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>HW4 Part1 - LastName</title>

  <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">

  <script src="//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>
</head>
<body>

<div class="container">

    <h3>Income Tax Calculator</h3>

    <form class="form-horizontal" method="post">

        
        <div class="form-group">
            <label class="control-label col-sm-2" for="netIncome">Your Net Income:</label>
            <div class="col-sm-10">
            <input type="number" step="any" name="netIncome" placeholder="Taxable  Income" required autofocus>
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

            echo "Results...<br>";
            $netIncome =$_POST['netIncome'];
            echo "With a net taxable income of $ $netIncome";
            //calculate the result
            $single = incomeTaxSingle($netIncome);
            $marriedJointly = incomeTaxMarriedJointly($netIncome);
            $marriedSeparately = incomeTaxMarriedSeparately($netIncome);
            $headOfHousehold = incomeTaxHeadOfHousehold($netIncome);

            //put result in an array

            $taxRes = array(
                    "Single" => $single,
                "Married Filing Jointly" => $marriedJointly,
                "Married Filing Separately" => $marriedSeparately,
                "Head of Household" =>  $headOfHousehold
            );
         //print result in table

            echo "<table class='table table-striped'>";
            echo "<tr> <th>Status</th> <th>Tax</th>";

            foreach ($taxRes as $attribute =>$value){
                echo "<tr><td>$attribute</td><td>$value</td></tr>";
            }
            echo "</table>";
        }

    ?>

</div>

</body>
</html>