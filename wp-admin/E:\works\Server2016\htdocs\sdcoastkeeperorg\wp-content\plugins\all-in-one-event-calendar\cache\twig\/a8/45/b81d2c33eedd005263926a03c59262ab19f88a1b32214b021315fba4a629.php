<?php

/* setting/tags-categories.twig */
class __TwigTemplate_a845b81d2c33eedd005263926a03c59262ab19f88a1b32214b021315fba4a629 extends Twig_Template
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
        echo "<div class=\"ai1ec-default-filters ai1ec-form-group\">
\t<label class=\"ai1ec-control-label ai1ec-col-sm-3\">
\t\t";
        // line 3
        echo twig_escape_filter($this->env, (isset($context["label"]) ? $context["label"] : null), "html", null, true);
        echo "
\t\t<div class=\"ai1ec-help-block\">
\t\t";
        // line 5
        echo (isset($context["help"]) ? $context["help"] : null);
        echo "
\t\t</div>
\t</label>
\t<div class=\"ai1ec-col-sm-9\">
\t\t<div class=\"ai1ec-row\">
\t\t\t";
        // line 10
        if (array_key_exists("categories", $context)) {
            // line 11
            echo "\t\t\t\t<div class=\"ai1ec-col-md-6\">
\t\t\t\t\t";
            // line 12
            echo (isset($context["categories"]) ? $context["categories"] : null);
            echo "
\t\t\t\t</div>
\t\t\t";
        }
        // line 15
        echo "\t\t\t";
        if (array_key_exists("tags", $context)) {
            // line 16
            echo "\t\t\t\t<div class=\"ai1ec-col-md-6\">
\t\t\t\t\t";
            // line 17
            echo (isset($context["tags"]) ? $context["tags"] : null);
            echo "
\t\t\t\t</div>
\t\t\t";
        }
        // line 20
        echo "\t\t</div>
\t</div>
</div>
";
    }

    public function getTemplateName()
    {
        return "setting/tags-categories.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  59 => 20,  53 => 17,  50 => 16,  47 => 15,  36 => 10,  23 => 3,  129 => 53,  119 => 49,  115 => 48,  108 => 44,  104 => 43,  97 => 39,  93 => 38,  86 => 34,  82 => 33,  75 => 29,  71 => 27,  67 => 26,  60 => 22,  48 => 19,  33 => 10,  22 => 2,  24 => 2,  51 => 10,  49 => 9,  41 => 12,  35 => 5,  30 => 3,  26 => 2,  19 => 1,  56 => 21,  52 => 20,  46 => 8,  43 => 7,  40 => 14,  38 => 11,  34 => 4,  31 => 3,  28 => 5,);
    }
}
