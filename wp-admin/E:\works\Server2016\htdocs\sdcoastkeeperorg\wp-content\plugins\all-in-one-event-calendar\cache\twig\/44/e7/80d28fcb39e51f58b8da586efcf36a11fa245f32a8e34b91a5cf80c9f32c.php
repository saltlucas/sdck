<?php

/* setting/textarea.twig */
class __TwigTemplate_44e780d28fcb39e51f58b8da586efcf36a11fa245f32a8e34b91a5cf80c9f32c extends Twig_Template
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
        echo "<label class=\"ai1ec-col-sm-12\" for=\"";
        echo twig_escape_filter($this->env, (isset($context["id"]) ? $context["id"] : null), "html", null, true);
        echo "\">
\t";
        // line 2
        echo (isset($context["label"]) ? $context["label"] : null);
        echo "
</label>
<div class=\"ai1ec-col-sm-12\">
\t";
        // line 5
        if (array_key_exists("append", $context)) {
            // line 6
            echo "\t\t<div class=\"ai1ec-input-group\">
\t";
        }
        // line 8
        echo "
\t";
        // line 9
        $context["__internal_245f268da500d0b7797df4e2b1fa84ac382ad3cc46f8ec1547a19d4c148403fb"] = $this->env->loadTemplate("form-elements/textarea.twig");
        // line 10
        echo "\t";
        ob_start();
        // line 11
        echo "\t";
        echo $context["__internal_245f268da500d0b7797df4e2b1fa84ac382ad3cc46f8ec1547a19d4c148403fb"]->gettextarea((isset($context["id"]) ? $context["id"] : null), (isset($context["id"]) ? $context["id"] : null), (isset($context["value"]) ? $context["value"] : null), (isset($context["input_args"]) ? $context["input_args"] : null));
        echo "

\t";
        // line 13
        if (array_key_exists("append", $context)) {
            // line 14
            echo "\t\t\t<span class=\"ai1ec-input-group-addon\">";
            echo twig_escape_filter($this->env, (isset($context["append"]) ? $context["append"] : null), "html", null, true);
            echo "</span>
\t\t</div>
\t";
        }
        // line 17
        echo "\t";
        echo trim(preg_replace('/>\s+</', '><', ob_get_clean()));
        // line 18
        echo "</div>

";
        // line 20
        if (array_key_exists("help", $context)) {
            // line 21
            echo "\t<div class=\"ai1ec-col-sm-12 ai1ec-help-block\">";
            echo (isset($context["help"]) ? $context["help"] : null);
            echo "</div>
";
        }
    }

    public function getTemplateName()
    {
        return "setting/textarea.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  68 => 21,  66 => 20,  62 => 18,  32 => 6,  137 => 38,  133 => 37,  127 => 34,  123 => 33,  114 => 30,  110 => 29,  102 => 28,  96 => 27,  87 => 24,  79 => 23,  63 => 18,  57 => 15,  37 => 9,  44 => 11,  42 => 11,  27 => 4,  95 => 35,  91 => 25,  88 => 32,  81 => 27,  77 => 26,  73 => 22,  58 => 17,  39 => 9,  29 => 7,  59 => 17,  53 => 17,  50 => 13,  47 => 15,  36 => 8,  23 => 3,  129 => 53,  119 => 32,  115 => 48,  108 => 44,  104 => 43,  97 => 36,  93 => 38,  86 => 34,  82 => 33,  75 => 29,  71 => 23,  67 => 19,  60 => 18,  48 => 13,  33 => 8,  22 => 2,  24 => 2,  51 => 14,  49 => 9,  41 => 10,  35 => 7,  30 => 5,  26 => 2,  19 => 1,  56 => 21,  52 => 14,  46 => 12,  43 => 11,  40 => 14,  38 => 11,  34 => 6,  31 => 5,  28 => 5,);
    }
}
