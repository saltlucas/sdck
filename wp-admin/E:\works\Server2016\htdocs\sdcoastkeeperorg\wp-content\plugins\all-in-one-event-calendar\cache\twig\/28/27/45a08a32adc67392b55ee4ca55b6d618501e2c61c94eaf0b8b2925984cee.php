<?php

/* setting/checkbox.twig */
class __TwigTemplate_282745a08a32adc67392b55ee4ca55b6d618501e2c61c94eaf0b8b2925984cee extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        // line 1
        echo "<div class=\"ai1ec-col-sm-12\">
\t<div class=\"checkbox\">
\t\t<label for=\"";
        // line 3
        echo twig_escape_filter($this->env, (isset($context["id"]) ? $context["id"] : null), "html", null, true);
        echo "\">
\t\t\t";
        // line 4
        $context["__internal_4951b2476fde4c8f6e8db3dcda2f2a65acf50dc864786f7148b04a5eb67cf0a3"] = $this->env->loadTemplate("form-elements/input.twig");
        // line 5
        echo "\t\t\t";
        echo $context["__internal_4951b2476fde4c8f6e8db3dcda2f2a65acf50dc864786f7148b04a5eb67cf0a3"]->getinput((isset($context["id"]) ? $context["id"] : null), (isset($context["id"]) ? $context["id"] : null), 1, "checkbox", (isset($context["attributes"]) ? $context["attributes"] : null));
        echo "

\t\t\t";
        // line 7
        echo $this->getAttribute((isset($context["renderer"]) ? $context["renderer"] : null), "label");
        echo "

\t\t</label>
\t</div>
\t";
        // line 11
        if ($this->getAttribute((isset($context["renderer"]) ? $context["renderer"] : null), "help", array(), "any", true, true)) {
            // line 12
            echo "\t\t<div class=\"ai1ec-help-block\">";
            echo $this->getAttribute((isset($context["renderer"]) ? $context["renderer"] : null), "help");
            echo "</div>
\t";
        }
        // line 14
        echo "</div>
";
    }

    public function getTemplateName()
    {
        return "setting/checkbox.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  44 => 12,  42 => 11,  27 => 4,  95 => 35,  91 => 33,  88 => 32,  81 => 27,  77 => 26,  73 => 24,  58 => 17,  39 => 9,  29 => 5,  59 => 20,  53 => 17,  50 => 14,  47 => 15,  36 => 10,  23 => 3,  129 => 53,  119 => 49,  115 => 48,  108 => 44,  104 => 43,  97 => 36,  93 => 38,  86 => 34,  82 => 33,  75 => 29,  71 => 23,  67 => 21,  60 => 18,  48 => 13,  33 => 10,  22 => 2,  24 => 2,  51 => 14,  49 => 9,  41 => 12,  35 => 7,  30 => 3,  26 => 2,  19 => 1,  56 => 21,  52 => 20,  46 => 12,  43 => 11,  40 => 14,  38 => 11,  34 => 6,  31 => 5,  28 => 5,);
    }
}
